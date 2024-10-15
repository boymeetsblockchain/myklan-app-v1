import { useState } from "react";
import { Pressable, View, Modal, Text, TouchableOpacity } from "react-native";
import { Post as PostProp, Media } from "../../types/post";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";
import { Image } from "react-native";
import { TextWrapper } from "../textwrapper";
import IconButton from "./IconButton";
import { TimeAgo } from "../timeago";
import ImageViewer from "react-native-image-zoom-viewer"; // Assuming you have this package
import { useRouter } from "expo-router"; // Use this hook for router navigation

export const Post = ({ post }: { post: PostProp }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const router = useRouter(); // Initialize the router

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  // Transform media into a format suitable for ImageViewer
  const images = post.media
    ? post.media.map((mediaItem: Media) => ({
        url: `https://myklan.africa/public/uploads/updates/images/${mediaItem.image}`,
      }))
    : [];

  return (
    <View style={tw`flex-1`}>
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
              renderIndicator={(currentIndex, allSize) => (
                <Text style={tw`text-white text-center`}>
                  {currentIndex} / {allSize}
                </Text>
              )}
            />
          </View>
        </Modal>
      )}

      <Pressable
        style={tw`flex-col p-4 border-b mb-4 gap-y-4 border-gray-300 bg-white shadow-md rounded-lg`}
        onPress={() =>
          router.push({
            pathname: `/post/[id]`,
            params: {
              username: post.creator.username,
              id: post.id,
            },
          })
        }
      >
        {/* User Info Section */}
        <View style={tw`flex flex-row gap-x-3 items-center`}>
          <Image
            source={{
              uri: `https://myklan.africa/public/uploads/avatar/${post.creator.avatar}`,
            }}
            style={tw`h-10 w-10 rounded-full`}
          />
          <View style={tw`flex-row items-center flex-1`}>
            <View style={tw`flex flex-row items-center gap-x-3`}>
              <TextWrapper
                style={tw`text-base font-semibold`}
                onPress={() => router.push(`/profile/${post.creator.username}`)} // Profile navigation
              >
                @{post.creator.username}
              </TextWrapper>
              <TextWrapper style={tw`text-gray-500`}>
                {post.creator.username}
              </TextWrapper>
            </View>
            <Entypo
              name="dots-three-horizontal"
              size={20}
              color="gray"
              style={tw`ml-auto`}
            />
          </View>
        </View>

        {/* Post Content Section */}
        <View>
          <TextWrapper style={tw`text-base text-gray-700 px-1`}>
            {post.description}
          </TextWrapper>

          {/* Render Media Images */}
          {post.media &&
            post.media.map((mediaItem: Media, index: number) =>
              mediaItem.type === "image" ? (
                <Pressable key={index} onPress={() => openImageModal(index)}>
                  <Image
                    source={{
                      uri: `https://myklan.africa/public/uploads/updates/images/${mediaItem.image}`,
                    }}
                    style={tw`w-full h-56 mt-3 rounded-lg`}
                    resizeMode="cover"
                  />
                </Pressable>
              ) : null
            )}

          {/* Post Date */}
          <TextWrapper style={tw`text-gray-500 text-sm px-1 mt-2`}>
            {TimeAgo(post.date as string)}
          </TextWrapper>

          {/* Action Buttons */}
          <View style={tw`flex-row my-2 justify-between px-1`}>
            <View style={tw`flex-row gap-x-6`}>
              <IconButton icon="comment" text={post.comments_count} />
              <IconButton icon="heart" text={post.likes_count} />
              <IconButton icon="share-apple" />
            </View>
            <IconButton icon="tag" />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
