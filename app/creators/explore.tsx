import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useGetExplorePosts } from "../../services/explore/queries";
import tw from "twrnc";
import { TextWrapper } from "../../components/textwrapper";
import { SafeViewComponent } from "../../components/safeview";
import { Post } from "../../components/post/Post";
import IconMenu from "../../components/iconView";
import { useState } from "react";

export default function ExplorePage() {
  const { data: post, isLoading, error } = useGetExplorePosts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Skeleton Loader Component
  const renderSkeletonLoader = () => (
    <View style={tw`p-4 bg-gray-100 mb-4 rounded-md`}>
      <View style={tw`h-4 bg-gray-300 mb-2 w-3/4 rounded`} />
      <View style={tw`h-3 bg-gray-300 mb-2 w-full rounded`} />
      <View style={tw`h-3 bg-gray-300 w-5/6 rounded`} />
    </View>
  );

  // Check if loading
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

  // Check for error
  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <Text style={tw`text-red-500`}>Failed to load posts</Text>
      </View>
    );
  }

  const posts = post?.updates?.data;
  console.log("checkingposts", posts);
  console.log("checkingposts", post);

  return (
    <View style={tw`flex-1`}>
      {/* Enable FlatList when ready */}
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id.toString()}
        style={tw`z-0`}
      />
    </View>
  );
}
