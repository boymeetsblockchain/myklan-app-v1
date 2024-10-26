import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Notification } from "../../../../types/notifications";
import { TimeAgo } from "../../../../components/timeago";
import { TextWrapper } from "../../../../components/textwrapper";

interface NotificationProps {
  avatar: string;
  username: string;
  description: string;
  date: string;
}

// NotificationItem Component
const NotificationItem: React.FC<NotificationProps> = ({
  avatar,
  username,
  description,
  date,
}) => (
  <View
    style={tw`bg-white p-2 rounded-lg mb-2 shadow-md border border-gray-300`}
  >
    <View style={tw`flex-row items-center mb-1`}>
      <Image
        source={{
          uri: `https://myklan.africa/public/uploads/avatar/${avatar}`,
        }}
        style={tw`w-8 h-8 rounded-full border border-gray-300`}
      />
      <View style={tw`ml-2 flex-1`}>
        <TextWrapper fontWeight="bold" textSize="sm">
          {username}
        </TextWrapper>
        <TextWrapper style={tw`text-gray-600 text-xs`}>
          {description}
        </TextWrapper>
        <TextWrapper style={tw`text-gray-400 text-[10px] mt-0.5`}>
          {TimeAgo(date)}
        </TextWrapper>
      </View>
    </View>
  </View>
);

// NotificationsScreen Component
const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found");

        const response = await axios.get(
          "http://api.myklan.africa/public/api/notifications",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotifications(response.data.data.data);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) fetchNotifications();
  }, [isFocused]);

  if (loading) {
    return (
      <View style={tw`flex-1 bg-white justify-center items-center`}>
        <ActivityIndicator size="large" color="#000" />
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
        contentContainerStyle={tw`px-3 pb-4`}
      />
    </View>
  );
};

export default NotificationsScreen;
