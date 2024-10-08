import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeViewComponent } from "../../components/safeview";
import { useGetUser } from "../../services/user/queries";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import { TextWrapper } from "../../components/textwrapper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PostPage() {
  const { data: user } = useGetUser();
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postPrice, setPostPrice] = useState("");

  const handlePostSubmit = async () => {
    // Check for post content
    if (!postContent) {
      alert("Please add content");
      return; // Exit early if there is no content
    }

    try {
      // Retrieve the auth token from AsyncStorage
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      // Create FormData to include the post details
      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("description", postContent);
      formData.append("price", String(postPrice));

      // Send the POST request
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

      // Check for successful response
      if (response.status === 200) {
        alert("Success! Your post has been created.");
      } else {
        alert("Failed to create post: " + response.data.message);
      }
    } catch (err: any) {
      console.error(err);
      // Display a user-friendly error message
      alert(
        "An error occurred: " +
          (err.response?.data?.message ||
            err.message ||
            "Something went wrong.")
      );
    }
  };

  return (
    <SafeViewComponent>
      <View style={tw`p-4 bg-white flex-1`}>
        {/* Header */}
        <View style={tw`flex-row items-center mb-4`}>
          <Image
            source={{
              uri: `https://myklan.africa/public/uploads/avatar/${user?.avatar}`,
            }}
            style={tw`w-12 h-12 rounded-full`}
          />
          <TextWrapper style={tw`ml-4text-gray-800`}>
            {user?.username}
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
        <View style={tw``}>
          <TextInput
            placeholder="What's on your mind?"
            placeholderTextColor="gray"
            value={postContent}
            onChangeText={(text) => setPostContent(text)}
            multiline
            style={tw`text-lg text-gray-900 p-4 bg-gray-100 rounded-lg h-20  mb-4`}
          />
        </View>

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
            style={tw`ml-2 text-white `}
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
