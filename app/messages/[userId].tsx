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
import { TextWrapper } from "../../components/textwrapper";
import { useLocalSearchParams } from "expo-router";
import { SafeViewComponent } from "../../components/safeview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";

interface Message {
  id: number;
  message: string;
  sender: {
    username: string;
  };
  recipient_id: number;
}

export default function MessagePage() {
  const { userId } = useLocalSearchParams() as { userId: string }; // Type the params
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Function to fetch messages
  const fetchMessages = async () => {
    setLoading(true);
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

      // Check if the response contains messages
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

  // Fetch messages on component mount and when userId changes
  useEffect(() => {
    fetchMessages();
  }, [userId]);

  // Function to send a message
  const sendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        `https://api.myklan.africa/public/api/message/send`,
        {
          recipient_id: Number(userId),
          message: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          response.data.new_message,
        ]);
        setNewMessage(""); // Clear input field
      } else {
        setError("Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Error sending message.");
    }
  };

  return (
    <SafeViewComponent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 p-4`}>
          <TextWrapper style={tw`text-lg font-bold mb-2`}>
            Chat with User {userId}
          </TextWrapper>

          {/* Message list */}
          {loading ? (
            <ActivityIndicator size="large" color="#ffde59" />
          ) : error ? (
            <Text style={tw`text-red-500`}>{error}</Text>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={tw`mb-4`}>
                  <Text style={tw`text-sm text-gray-600`}>
                    <Text style={tw`text-black`}>{item.message}</Text>
                  </Text>
                </View>
              )}
              inverted
            />
          )}

          {/* Send message input */}
          <View style={tw`mt-4 flex-row items-center`}>
            <TextInput
              style={tw`flex-1 border border-gray-300 rounded-md p-3`}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <Pressable
              style={tw`ml-2 bg-black p-3 rounded-md`}
              onPress={sendMessage}
            >
              <Text style={tw`text-white font-bold`}>Send</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeViewComponent>
  );
}
