import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeViewComponent } from "../../components/safeview";
import { useGetUser } from "../../services/user/queries";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import { TextWrapper } from "../../components/textwrapper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

interface User {
  avatar: string;
  username: string;
}

export default function PostPage() {
  const { data: user } = useGetUser();
  const [postContent, setPostContent] = useState<string>("");
  const [postTitle, setPostTitle] = useState<string>("");
  const [postPrice, setPostPrice] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handlePostSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("description", postContent);
      formData.append("price", String(postPrice));

      selectedImages.forEach((imageUri, index) => {
        formData.append(`fileuploader-list-photo[]`, {
          uri: imageUri,
          type: "image/jpeg",
          name: imageUri.split("/").pop() || `image_${index}.jpg`,
        } as any);
      });

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
      console.error(err.response?.data?.message);
      alert(
        "An error occurred: " +
          (err.response?.data?.message ||
            err.message ||
            "Something went wrong.")
      );
    }
  };

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker (allow multiple selection)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,

      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const uris = result.assets.map((asset) => asset.uri);
      setSelectedImages(uris);
    }
  };

  return (
    <SafeViewComponent>
      <View style={tw`p-4 bg-white flex-1`}>
        {/* Header */}
        <View style={tw`flex-row items-center mb-4`}>
          <Image
            source={{
              uri: `https://myklan.africa/public/uploads/avatar/${
                user?.avatar || ""
              }`,
            }}
            style={tw`w-12 h-12 rounded-full`}
          />
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

        {/* Select Image Button */}
        <TouchableOpacity
          onPress={handleImagePicker}
          style={tw`bg-gray-200 p-3 rounded-lg mb-4`}
        >
          <Text style={tw`text-center text-gray-700`}>
            {selectedImages.length > 0 ? "Change Images" : "Select Images"}
          </Text>
        </TouchableOpacity>

        {/* Display Selected Images */}
        <ScrollView horizontal style={tw`mb-4`}>
          {selectedImages.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={tw`h-40 w-40 mr-2 rounded-lg`}
            />
          ))}
        </ScrollView>

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
