import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";

interface Message {
  id: number;
  message: string;
  to_user_id: number;
  from_user_id: number;
}

export default function MessagePage() {
  const { userId } = useLocalSearchParams() as { userId: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  console.log(userId);

  // Function to fetch current user's ID
  const fetchCurrentUserId = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No token found");
    }
    try {
      const response = await axios.get(
        "https://api.myklan.africa/public/api/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentUserId(response.data.user_id);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Function to fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        `https://api.myklan.africa/public/api/messages/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.messages) {
        setMessages(response.data.messages);
      } else {
        setError("Failed to load messages.");
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Error fetching messages.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages and current user ID on component mount
  useEffect(() => {
    fetchCurrentUserId(); // Fetch the current user ID
    fetchMessages(); // Fetch the messages
  }, [userId]);

  // Function to send a message
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      setError("Message cannot be empty");
      return;
    }

    setError(""); // Reset error state
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        `https://api.myklan.africa/public/api/message/send`,
        {
          id_user: Number(userId),
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Add new message to the state and reset input
        setMessages((prevMessages) => [
          response.data.new_message,
          ...prevMessages,
        ]);
        setNewMessage(""); // Clear the input field
      } else {
        // Display the error message returned from the API
        setError(response.data.error || "Failed to send message.");
      }
    } catch (err: any) {
      // Catch and display any network or unexpected errors
      console.error("Error sending message:", err.message);
      setError(err.response?.data?.error || "Error sending message.");
    }
  };

  // Function to render each message
  const renderItem = ({ item }: { item: Message }) => {
    const isCurrentUser = currentUserId === item.from_user_id;

    return (
      <View
        style={[
          tw`flex-row mb-2`,
          isCurrentUser ? tw`justify-end` : tw`justify-start`,
        ]}
      >
        <View
          style={[
            tw`max-w-4/5 p-3 rounded-lg`,
            isCurrentUser ? tw`bg-black` : tw`bg-gray-200`,
          ]}
        >
          <Text
            style={tw`text-sm ${isCurrentUser ? "text-white" : "text-black"}`}
          >
            {item.message}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        {/* Message List */}
        <View style={tw`flex-1 p-4`}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffde59" />
          ) : error ? (
            <Text style={tw`text-red-500`}>{error}</Text>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              inverted
              contentContainerStyle={tw`flex-grow justify-end`}
            />
          )}
        </View>

        {/* Message Input */}
        <View style={tw`p-4 flex-row border-t border-gray-300`}>
          <TextInput
            style={tw`flex-1 border border-gray-300 rounded-full p-3`}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <Pressable
            style={tw`ml-2 bg-black p-3 rounded-2xl`}
            onPress={sendMessage}
          >
            <Text style={tw`text-white text-center font-bold`}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
