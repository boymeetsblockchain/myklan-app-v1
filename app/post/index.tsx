import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image } from "react-native";
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
    if (!postContent) {
      alert("Please add content");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("description", postContent);
      formData.append("price", String(postPrice));

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

  return (
    <SafeViewComponent>
      <View style={tw`flex-1 p-6 bg-white`}>
        {/* User Info Header */}
        <View style={tw`flex-row items-center mb-6`}>
          <Image
            source={{
              uri: `https://myklan.africa/public/uploads/avatar/${user?.avatar}`,
            }}
            style={tw`w-14 h-14 rounded-full`}
          />
          <TextWrapper style={tw`ml-4 text-xl text-gray-900 font-semibold`}>
            {user?.username}
          </TextWrapper>
        </View>

        {/* Post Title Input */}
        <TextInput
          placeholder="Enter post title"
          placeholderTextColor="#6b7280"
          value={postTitle}
          onChangeText={setPostTitle}
          style={tw`text-lg p-4 mb-4 bg-gray-100 rounded-lg text-gray-900`}
        />

        {/* Post Content Input */}
        <TextInput
          placeholder="What's on your mind?"
          placeholderTextColor="#6b7280"
          value={postContent}
          onChangeText={setPostContent}
          multiline
          style={[
            { fontFamily: "Poppins-Regular", fontSize: 16 },
            tw`text-lg p-4 mb-4 bg-gray-100 rounded-lg text-gray-900 h-24`,
          ]}
        />

        {/* Post Price Input */}
        <TextInput
          placeholder="Enter post price (optional)"
          placeholderTextColor="#6b7280"
          keyboardType="numeric"
          value={postPrice}
          onChangeText={setPostPrice}
          style={[
            { fontFamily: "Poppins-Regular", fontSize: 16 },
            tw`text-lg p-4 mb-6 bg-gray-100 rounded-lg text-gray-900`,
          ]}
        />

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handlePostSubmit}
          style={tw`bg-black p-4 rounded-lg flex-row justify-center items-center`}
        >
          <AntDesign name="check" size={20} color="white" />
          <TextWrapper style={tw`ml-2 text-white text-lg font-semibold`}>
            Post
          </TextWrapper>
        </TouchableOpacity>
      </View>
    </SafeViewComponent>
  );
}
