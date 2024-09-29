import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeViewComponent } from "../../components/safeview";
import { useGetUser } from "../../services/user/queries";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import { TextWrapper } from "../../components/textwrapper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";

interface User {
  avatar: string;
  username: string;
}

export default function PostPage() {
  const { data: user } = useGetUser();
  const [postContent, setPostContent] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postPrice, setPostPrice] = useState<string>("");
  const [selectedZip, setSelectedZip] = useState<string | null>(null); // State for selected zip file

  const handlePostSubmit = async () => {
    // Check for post content
    if (!postContent) {
      alert("Please add content");
      return; // Exit early if there is no content
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("description", postContent);
      formData.append("price", String(postPrice)); // Convert price to a string

      // Include the selected zip file if available
      if (selectedZip) {
        formData.append("zip", {
          uri: selectedZip,
          type: "application/zip", // Adjust according to your needs
          name: selectedZip.split("/").pop() || "file.zip", // Default filename
        } as any); // Type assertion since FormData expects 'any'
      }

      const response = await axios.post(
        "https://api.myklan.africa/public/api/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Success! Your post has been created.");
      } else {
        alert("Failed to create post: " + response.data.message);
      }
    } catch (err: any) {
      console.error(err);
      alert(
        "An error occurred: " +
          (err.response?.data?.message ||
            err.message ||
            "Something went wrong.")
      );
    }
  };

  const handleZipPicker = async () => {
    // Launch the document picker for zip files
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/zip",
      copyToCacheDirectory: true, // Optional: copy to cache for better performance
    });

    // Check if the user cancelled the picker
    if (result.type === "cancel") {
      console.log("User cancelled document picker");
      return;
    }

    // Set the selected zip file URI
    setSelectedZip(result.uri);
  };

  return (
    <SafeViewComponent>
      <View style={tw`p-4 bg-white flex-1`}>
        {/* Header */}
        <View style={tw`flex-row items-center mb-4`}>
          <TextWrapper style={tw`ml-4 text-gray-800`}>
            {user?.username || "User"}
          </TextWrapper>
        </View>

        {/* Post Title Input */}
        <TextInput
          placeholder="Enter post title"
          placeholderTextColor="gray"
          value={postTitle}
          onChangeText={(text) => setPostTitle(text)}
          style={tw`text-lg text-gray-900 p-4 bg-gray-100 rounded-lg mb-4`}
        />

        {/* Post Content Input */}
        <TextInput
          placeholder="What's on your mind?"
          placeholderTextColor="gray"
          value={postContent}
          onChangeText={(text) => setPostContent(text)}
          multiline
          style={tw`text-lg text-gray-900 p-4 bg-gray-100 rounded-lg h-20 mb-4`}
        />

        {/* Select Zip File Button */}
        <TouchableOpacity
          onPress={handleZipPicker}
          style={tw`bg-gray-200 p-3 rounded-lg mb-4`}
        >
          <Text style={tw`text-center text-gray-700`}>
            {selectedZip ? "Change Zip File" : "Select Zip File"}
          </Text>
        </TouchableOpacity>

        {/* Display Selected Zip File */}
        {selectedZip && (
          <Text style={tw`text-gray-700 mb-4`}>
            Selected Zip: {selectedZip.split("/").pop()}
          </Text>
        )}

        {/* Post Price Input */}
        <TextInput
          placeholder="Enter post price (optional)"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={postPrice}
          onChangeText={(text) => setPostPrice(text)}
          style={tw`text-lg text-gray-900 p-4 bg-gray-100 rounded-lg mb-4`}
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handlePostSubmit}
          style={tw`bg-black p-3 rounded-lg flex-row justify-center items-center mt-auto`}
        >
          <AntDesign name="check" size={20} color="white" />
          <TextWrapper
            style={tw`ml-2 text-white`}
            fontWeight="bold"
            textSize="lg"
          >
            Post
          </TextWrapper>
        </TouchableOpacity>
      </View>
    </SafeViewComponent>
  );
}
