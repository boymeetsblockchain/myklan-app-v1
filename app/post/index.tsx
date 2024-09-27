import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeViewComponent } from "../../components/safeview";
import { useGetUser } from "../../services/user/queries";
import {
  FontAwesome,
  Entypo,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import tw from "twrnc";
import { TextWrapper } from "../../components/textwrapper";

export default function PostPage() {
  const { data: user } = useGetUser();
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postPrice, setPostPrice] = useState("");

  const handlePostSubmit = () => {
    console.log(
      "Post Content:",
      postContent,
      "Post Title:",
      postTitle,
      "Post Price:",
      postPrice
    );
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
            style={tw`text-lg text-gray-900 p-4 bg-gray-100 rounded-lg h-48 mb-4`}
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

        {/* Media Options */}
        <View style={tw`flex-row justify-between items-center py-3`}>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <FontAwesome name="image" size={24} color="gray" />
            <TextWrapper style={tw`ml-2 text-gray-700`}>Add Photo</TextWrapper>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <Entypo name="video" size={24} color="gray" />
            <TextWrapper style={tw`ml-2 text-gray-700`}>Add Video</TextWrapper>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <MaterialIcons name="attach-file" size={24} color="gray" />
            <TextWrapper style={tw`ml-2 text-gray-700`}>Add Zip</TextWrapper>
          </TouchableOpacity>
        </View>

        {/* Additional Options */}
        <View style={tw`flex-row justify-between items-center py-3`}>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <MaterialIcons name="stream" size={24} color="gray" />
            <TextWrapper style={tw`ml-2 text-gray-700`}>Stream</TextWrapper>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <FontAwesome name="file-text-o" size={24} color="gray" />
            <TextWrapper style={tw`ml-2 text-gray-700`}>Add ePub</TextWrapper>
          </TouchableOpacity>
        </View>

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
