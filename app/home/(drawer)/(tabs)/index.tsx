import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeViewComponent } from "../../../../components/safeview";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  TextWrapperWhite,
  TextWrapper,
} from "../../../../components/textwrapper";
import AntDesign from "@expo/vector-icons/AntDesign";
import tw from "twrnc";
import { Link, router } from "expo-router";
import { useGetMyPosts } from "../../../../services/posts/queries";
import { Post } from "../../../../components/post/Post";

export default function Dashboard() {
  const { data: posts, isLoading, error } = useGetMyPosts();

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
          Unable to Fetch Posts
        </TextWrapper>
        <TouchableOpacity
          onPress={() => router.push("/creators/")}
          style={tw`mt-4 bg-yellow-500 p-2 rounded`}
        >
          <TextWrapperWhite>Become a Creator to see posts</TextWrapperWhite>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        style={tw`absolute bottom-10 right-3 bg-black p-4 rounded-full`}
      >
        <Link href={"/post"}>
          <AntDesign name="plus" size={24} color="white" />
        </Link>
      </TouchableOpacity>
    </View>
  );
}
