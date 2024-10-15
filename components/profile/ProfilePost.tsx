import { useState } from "react";
import {
  Image,
  Pressable,
  View,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import { TextWrapper } from "../textwrapper";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { Media } from "../../types/post";
import ImageViewer from "react-native-image-zoom-viewer"; // Assuming you have this package
import { router } from "expo-router";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Transform media into a format suitable for ImageViewer
  const images = post.media
    ? post.media.map((mediaItem: Media) => ({
        url: `https://myklan.africa/public/uploads/updates/images/${mediaItem.image}`,
      }))
    : [];

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  return (
    <View
      style={tw`flex-col p-4 bg-gray-100 border border-gray-300 rounded-lg mb-4`}
    >
      <Pressable
        style={tw`flex-row items-center justify-between mb-3`}
        onPress={() =>
          router.push({
            pathname: `/post/[id]`,
            params: {
              username,
              id: post.id,
            },
          })
        }
      >
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
        <TextWrapper style={tw`  text-gray-800 mb-1`}>{post.title}</TextWrapper>
        <TextWrapper style={tw`text-sm text-gray-600`}>
          {post.description}
        </TextWrapper>
      </View>

      {/* Post Media */}
      {post.media && post.media.length > 0 ? (
        post.media.map((mediaItem: Media, index: number) =>
          mediaItem.type === "image" && mediaItem.image ? (
            <Pressable key={index} onPress={() => openImageModal(index)}>
              <Image
                source={{
                  uri: `https://myklan.africa/public/uploads/updates/images/${mediaItem.image}`,
                }}
                style={tw`w-full aspect-16/9 mt-3 rounded-lg`} // Replace with a fixed height for testing
              />
            </Pressable>
          ) : null
        )
      ) : (
        <TextWrapper style={tw`text-sm text-gray-600`}>
          No media available
        </TextWrapper>
      )}

      {/* Modal to display full-screen images */}
      {images.length > 0 && (
        <Modal visible={modalVisible} transparent={true}>
          <View style={tw`flex-1 bg-black`}>
            {/* Close Button */}
            <TouchableOpacity
              style={tw`absolute top-10 right-5 z-10 bg-gray-700 p-3 rounded-full`}
              onPress={closeImageModal}
            >
              <Text style={tw`text-white text-lg`}>Close</Text>
            </TouchableOpacity>

            <ImageViewer
              imageUrls={images}
              index={selectedImageIndex}
              onSwipeDown={closeImageModal} // Close on swipe down
              enableSwipeDown={true}
              // renderIndicator={(currentIndex, allSize) => (
              //   <Text style={tw`text-white text-center`}>
              //     {currentIndex + 1} / {allSize}
              //   </Text>
              // )}
            />
          </View>
        </Modal>
      )}

      {/* Date and Post Actions */}
      <TextWrapper style={tw`text-xs text-gray-500 mb-2`}>
        {new Date(post.date).toLocaleDateString()}
      </TextWrapper>
    </View>
  );
};
