import React, { useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import AntDesign from "@expo/vector-icons/AntDesign";

import {
  TextWrapper,
  TextWrapperWhite,
} from "../../../../components/textwrapper";
import tw from "twrnc";
import { router } from "expo-router";
import { useGetMyPosts } from "../../../../services/posts/queries";
import { Post } from "../../../../components/post/Post";
import IconMenu from "../../../../components/iconView";

export default function Dashboard() {
  const { data: posts, isLoading, error } = useGetMyPosts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Updated skeleton loader with colors matching the white background
  const renderSkeletonLoader = () => (
    <View style={tw`p-4 bg-gray-100 mb-4 rounded-md`}>
      <View style={tw`h-4 bg-gray-300 mb-2 w-3/4 rounded`} />
      <View style={tw`h-3 bg-gray-300 mb-2 w-full rounded`} />
      <View style={tw`h-3 bg-gray-300 w-5/6 rounded`} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        {[...Array(20)].map((_, index) => (
          <View key={index} style={tw`w-full mb-4`}>
            {renderSkeletonLoader()}
          </View>
        ))}
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <TextWrapper style={tw`text-red-500`}>
          Unable to Fetch Posts Become a creator
        </TextWrapper>
        <TouchableOpacity
          onPress={() => router.push("/creators/")}
          style={tw`mt-4 bg-black p-2 rounded`}
        >
          <TextWrapperWhite>Become a Creator to see posts</TextWrapperWhite>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/creators/explore")}
          style={tw`mt-4 bg-black p-2 rounded`}
        >
          <TextWrapperWhite>Visit Our Explore page</TextWrapperWhite>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={tw`z-0`}
        showsVerticalScrollIndicator={false}
      />

      {/* Plus button with the IconMenu */}
      <TouchableOpacity
        style={tw`absolute bottom-2 right-4 p-4  z-10`}
        onPress={() => setIsMenuOpen((prev) => !prev)}
      >
        <IconMenu />
      </TouchableOpacity>
    </View>
  );
}
