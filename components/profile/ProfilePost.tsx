import { Image, Pressable, View } from "react-native";
import { TextWrapper } from "../textwrapper";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { Media } from "../../types/post";

export type Post = {
  id: number;
  title: string;
  description: string;
  user_id: string;
  date: string;
  token_id: string;
  locked: string;
  fixed_post: string;
  price: string;
  status: string;
  video_views: string;
  ip: string;
  scheduled_date: string;
  schedule: string;
  editing: string;
  can_media_edit: string;
  media: Media[];
};

interface ProfilePostProps {
  post: Post;
  avatar: string;
  username: string;
}

export const ProfilePosts = ({ post, avatar, username }: ProfilePostProps) => {
  return (
    <View
      style={tw`flex-col p-4 bg-gray-100 border border-gray-300 rounded-lg mb-4`}
    >
      {/* Header: Avatar and Username */}
      <Pressable style={tw`flex-row items-center justify-between mb-3`}>
        <View style={tw`flex-row items-center gap-x-3`}>
          {avatar && (
            <Image
              source={{
                uri: `https://myklan.africa/public/uploads/avatar/${avatar}`,
              }}
              style={tw`h-10 w-10 rounded-full border border-gray-200`}
            />
          )}
          <View>
            <TextWrapper style={tw`text-lg font-semibold text-gray-900`}>
              @{username}
            </TextWrapper>
            <TextWrapper style={tw`text-sm text-gray-500`}>
              {username}
            </TextWrapper>
          </View>
        </View>
        <Entypo name="dots-three-horizontal" size={20} color="gray" />
      </Pressable>

      {/* Post Content */}
      <View style={tw`mb-3`}>
        <TextWrapper style={tw`text-lg font-medium text-gray-800 mb-1`}>
          {post.title}
        </TextWrapper>
        <TextWrapper style={tw`text-sm text-gray-600`}>
          {post.description}
        </TextWrapper>
      </View>

      {post.media &&
        post.media.map((mediaItem: Media, index: number) =>
          mediaItem.type === "image" ? (
            <Image
              key={index}
              source={{
                uri: `https://myklan.africa/public/uploads/updates/images/${mediaItem.image}`,
              }}
              style={tw`w-full aspect-16/9 mt-3 rounded-lg`}
            />
          ) : null
        )}
      {/* Date and Post Actions */}
      <TextWrapper style={tw`text-xs text-gray-500 mb-2`}>
        {new Date(post.date).toLocaleDateString()}
      </TextWrapper>
    </View>
  );
};
