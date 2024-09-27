import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Notification } from "../../../../types/notifications";
import { Image } from "react-native";
import { TimeAgo } from "../../../../components/timeago";
import { TextWrapper } from "../../../../components/textwrapper";

interface NotificationProps {
  avatar: string;
  username: string;
  description: string;
  date: string;
}

const NotificationItem = ({
  avatar,
  username,
  description,
  date,
}: NotificationProps) => (
  <View
    style={tw`bg-white p-4 rounded-lg mb-4 shadow-md border border-gray-300`}
  >
    <View style={tw`flex-row items-center mb-2`}>
      <Image
        source={{
          uri: `https://myklan.africa/public/uploads/avatar/${avatar}`,
        }}
        style={tw`w-12 h-12 rounded-full border border-gray-300`}
      />
      <View style={tw`ml-3 flex-1`}>
        <TextWrapper fontWeight="bold" textSize="base">
          {username}
        </TextWrapper>
        <TextWrapper style={tw`text-gray-600 `}>{description}</TextWrapper>
        <TextWrapper style={tw`text-gray-400 text-xs mt-1`}>
          {TimeAgo(date)}
        </TextWrapper>
      </View>
    </View>
  </View>
);

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const focused = useIsFocused();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          throw new Error("No auth token found");
        }

        const response = await axios.get(
          "http://api.myklan.africa/public/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data.data.data);
        setError(null); // Reset error state if data is successfully fetched
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (focused) {
      fetchNotifications();
    }
  }, [focused]);

  if (loading) {
    return (
      <View style={tw`flex-1 bg-white justify-center items-center`}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 bg-gray-100 justify-center items-center`}>
        <Text style={tw`text-black text-lg`}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-100 pt-6`}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem
            username={item.username}
            avatar={item.avatar}
            description={item.description}
            date={item.created_at}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`px-4 pb-6`}
      />
    </View>
  );
}
