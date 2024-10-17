import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useGetBookmarks } from "../../../services/bookmarks/queries";
import tw from "twrnc";
import { UpdateData } from "../../../types/bookmark";
import { Post } from "../../../components/post/Post";

export default function Bookmarks() {
  const { data: bookmarks, isLoading, isError, error } = useGetBookmarks();

  // Display loading state
  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Display error state
  if (isError) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500`}>
          Error fetching bookmarks: {error?.message || "Unknown error"}
        </Text>
      </View>
    );
  }

  // Empty state handling
  if (!bookmarks?.updates?.data.length) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>No bookmarks available.</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 p-4`}>
      <FlatList
        data={bookmarks.updates.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post post={item} />}
        contentContainerStyle={tw`pb-20`}
      />
    </View>
  );
}
