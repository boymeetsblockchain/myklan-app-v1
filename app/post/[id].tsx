import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  TextInput,
  Button,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeViewComponent } from "../../components/safeview";
import { useEffect, useState } from "react";
import axios from "axios";
import { PostData } from "../../types/singlepost";
import { TextWrapper, TextWrapperWhite } from "../../components/textwrapper";
import { TimeAgo } from "../../components/timeago";
import IconButton from "../../components/post/IconButton";
import ImageViewer from "react-native-image-zoom-viewer";
import { useFocusEffect } from "expo-router";
import tw from "twrnc";

export default function SinglePostPage() {
  const { username, id } = useLocalSearchParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [commentInputVisible, setCommentInputVisible] = useState(false); // To toggle comment input
  const [newComment, setNewComment] = useState(""); // New comment input
  const [comments, setComments] = useState(post?.updates?.comments || []); // To handle comments
  const [tipModalVisible, setTipModalVisible] = useState(false);
  const [tipAmount, setTipAmount] = useState("");

  const getToken = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token found");
    }
    return token;
  };

  const fetchPostComment = async () => {
    try {
      const token = await getToken();
      if (id) {
        const response = await axios.get(
          `https://api.myklan.africa/public/api/load/comments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);

        if (!response.data?.Datacomments) {
          setComments([]);
          return;
        }

        const fetchedComments = response.data.Datacomments.map(
          (comment: any) => ({
            id: comment.id,
            username: comment.user.username,
            avatar: comment.user.avatar,
            comment: comment.reply,
            date: comment.date,
            likes: comment.likes || [],
            replies: comment.replies || [],
          })
        );

        setComments(fetchedComments);
      }
    } catch (err: any) {
      console.error("Error fetching post comments:", err);
      alert("Failed to fetch post comments");
    }
  };

  useEffect(() => {
    fetchPostComment();
  }, [id]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await getToken();
        if (username && id) {
          const response = await axios.get(
            `https://api.myklan.africa/public/api/${username}/post/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPost(response.data);
          setComments(response.data?.updates?.comments || []); // Initialize comments
        }
      } catch (err: any) {
        console.error("Error fetching post:", err);
        setError("Failed to fetch post data");
      }
    };

    fetchPost();
  }, [username, id]);

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  const likePost = async () => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `https://api.myklan.africa/public/api/like/post/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post liked successfully", response.data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Submit comment
  const submitComment = async () => {
    if (!newComment) return; // Prevent empty comments

    try {
      const token = await getToken();
      const response = await axios.post(
        `https://api.myklan.africa/public/api/comment/post`,
        { comment: newComment, post_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
      setCommentInputVisible(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const images = post?.updates?.media
    ? post.updates.media.map((mediaItem) => ({
        url: `https://myklan.africa/public/uploads/updates/images/${mediaItem.image}`,
      }))
    : [];

  const tipUser = async () => {
    if (!tipAmount) return; // Prevent empty tip amount
    const token = await getToken();
    console.log(post?.user.id);
    console.log(id);
    try {
      const response = await axios.post(
        "https://api.myklan.africa/public/api/send/tip",
        { id: post?.user.id, amount: tipAmount, payment_gateway_tip: "wallet" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Tip sent successfully");
      setTipModalVisible(false);
      setTipAmount("");
    } catch (error: any) {
      console.error("Error sending tip:", error.response?.data || error);
    }
  };

  if (!post && !error) {
    return (
      <SafeViewComponent>
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size={"large"} collapsable color={"black"} />
        </View>
      </SafeViewComponent>
    );
  }

  if (error) {
    return (
      <SafeViewComponent>
        <TextWrapper>Error: {error}</TextWrapper>
      </SafeViewComponent>
    );
  }

  return (
    <SafeViewComponent>
      {images.length > 0 && (
        <Modal visible={modalVisible} transparent={true}>
          <View style={tw`flex-1 bg-black`}>
            <TouchableOpacity
              style={tw`absolute top-10 right-5 z-10 bg-gray-700 p-3 rounded-full`}
              onPress={closeImageModal}
            >
              <Text style={tw`text-white text-lg`}>Close</Text>
            </TouchableOpacity>

            <ImageViewer
              imageUrls={images}
              index={selectedImageIndex}
              onSwipeDown={closeImageModal}
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
      >
        {/* User Info */}
        <View style={tw`flex flex-row gap-x-3 items-center`}>
          <Image
            source={{
              uri: `https://myklan.africa/public/uploads/avatar/${post?.updates.creator.avatar}`,
            }}
            style={tw`h-10 w-10 rounded-full`}
          />
          <View style={tw`flex-row items-center flex-1`}>
            <View style={tw`flex flex-row items-center gap-x-3`}>
              <TextWrapper style={tw`text-base font-semibold`}>
                @{post?.updates.creator.username}
              </TextWrapper>
              <TextWrapper style={tw`text-gray-500`}>
                {post?.updates.creator.username}
              </TextWrapper>
            </View>
          </View>
        </View>

        {/* Post Content */}
        <View>
          <TextWrapper style={tw`text-base text-gray-700 px-1`}>
            {post?.updates.description}
          </TextWrapper>

          {/* Media Images */}
          {post?.updates.media &&
            post.updates.media.map((mediaItem, index) =>
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

          <TextWrapper style={tw`text-gray-500 text-sm px-1 mt-2`}>
            {TimeAgo(post?.updates.date as string)}
          </TextWrapper>

          {/* Action Buttons */}
          <View style={tw`flex-row my-2 justify-between px-1`}>
            <View style={tw`flex-row gap-x-6`}>
              <IconButton
                icon="comment"
                text={comments.length || 0} // Show comments count
                onPress={() => setCommentInputVisible(!commentInputVisible)} // Toggle input
              />
              <IconButton
                icon="heart"
                text={post?.updates.likes.length || 0}
                onPress={likePost}
              />
              <IconButton icon="share-apple" />
            </View>
            <IconButton icon="tag" onPress={() => setTipModalVisible(true)} />
          </View>
        </View>

        {/* Comments Section */}
        <View style={tw`px-2 mt-4`}>
          <TextWrapper style={tw`font-semibold text-lg mb-2`}>
            Comments ({comments.length})
          </TextWrapper>

          {/* Display comments */}
          <FlatList
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={tw`flex flex-row gap-x-2 py-2 border-b border-gray-400  mb-2`}
              >
                <Image
                  source={{
                    uri: `https://myklan.africa/public/uploads/avatar/${item.avatar}`,
                  }}
                  style={tw`h-8 w-8 rounded-full`}
                />
                <View>
                  <TextWrapper style={tw`font-semibold`}>
                    {item.username}
                  </TextWrapper>
                  <TextWrapper>{item.comment}</TextWrapper>
                  <TextWrapper style={tw`text-gray-500 text-xs`}>
                    {TimeAgo(item.date)}
                  </TextWrapper>
                </View>
              </View>
            )}
          />

          {/* Comment Input */}
          {commentInputVisible && (
            <KeyboardAvoidingView behavior="padding" style={tw`mt-4`}>
              <TextInput
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Write a comment..."
                style={tw`border p-3 rounded-lg`}
              />

              <TouchableOpacity
                style={tw`bg-black  py-3 px-2 rounded-lg my-4`}
                onPress={submitComment}
              >
                <TextWrapperWhite style={tw`text-center`} fontWeight="bold">
                  Comment
                </TextWrapperWhite>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          )}
        </View>
      </Pressable>
      <Modal visible={tipModalVisible} transparent={true}>
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View style={tw`bg-white rounded-lg p-6 w-80`}>
            <TextWrapper style={tw` mb-4`} fontWeight="bold" textSize="lg">
              Send a Tip
            </TextWrapper>
            <TextInput
              value={tipAmount}
              onChangeText={setTipAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
              style={tw`border border-gray-300 p-3  rounded-lg mb-4`}
            />
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-black px-2 py-3 rounded-md`}
                onPress={() => setTipModalVisible(false)}
              >
                <TextWrapperWhite>Cancel</TextWrapperWhite>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-black px-2 py-3 rounded-md`}
                onPress={tipUser}
              >
                <TextWrapperWhite>Tip User</TextWrapperWhite>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeViewComponent>
  );
}
