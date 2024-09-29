import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import tw from "twrnc";
import { useLocalSearchParams } from "expo-router";
import { useGetUserByUsername } from "../../services/user/queries";
import { TextWrapper, TextWrapperWhite } from "../../components/textwrapper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useIsFocused } from "@react-navigation/native";
import { ProfilePosts } from "../../components/profile/ProfilePost";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SubscriptionModal } from "../../components/subscribeModal";

export default function Creator() {
  const params = useLocalSearchParams();
  const username = params.username ? String(params.username) : "";
  const { data: profile, isLoading, error } = useGetUserByUsername(username);
  const focused = useIsFocused();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Check if user is subscribed based on the profile data
    if (profile?.subscribed_to_user) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [profile]);

  const subscribe = async () => {
    if (profile?.free_subscription === "no") {
      setIsModalVisible(true);
    } else {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.post(
          `https://api.myklan.africa/public/api/subscription/free/${profile?.user.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          Alert.alert("Success", "Subscription successful!");
          setIsSubscribed(true);
        } else {
          Alert.alert("Error", "Subscription failed. Please try again.");
        }
      } catch (err) {
        console.error("Subscription error:", err);
        Alert.alert("Error", "An error occurred. Please try again.");
      }
    }
  };

  const unsubscribe = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        `https://api.myklan.africa/public/api/subscription/wallet/cancel/${profile?.user.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Unsubscription successful!");
        setIsSubscribed(false);
      } else {
        Alert.alert("Error", "Unsubscription failed. Please try again.");
      }
    } catch (err) {
      console.error("Unsubscription error:", err);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"large"}
        color={"black"}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      />
    );
  }

  if (error) {
    return <Text>Error loading profile</Text>;
  }

  return (
    <View style={tw`bg-white flex-1`}>
      <View>
        {/* Cover Image Section */}
        <View style={tw`relative`}>
          <Image
            source={{
              uri: `https://myklan.africa/public/uploads/cover/${profile?.user.cover}`,
            }}
            style={tw`w-full h-30`}
          />
        </View>

        {/* Profile Image and Details */}
        <View style={tw`px-4 -mt-12`}>
          <View style={tw`flex-col items-center relative`}>
            <Image
              source={{
                uri: `https://myklan.africa/public/uploads/avatar/${profile?.user.avatar}`,
              }}
              style={tw`w-24 h-24 rounded-full border-4 border-black`}
            />
            <View style={tw`flex-row items-center mt-2 gap-x-2`}>
              <TextWrapper style={tw`text-lg font-semibold`}>
                {profile?.user.username}
              </TextWrapper>
            </View>

            {/* Subscribe/Unsubscribe Button */}
            {isSubscribed ? (
              <Pressable
                style={tw`mt-4 bg-gray-700 py-2 px-4 rounded-md`}
                onPress={unsubscribe}
              >
                <TextWrapperWhite>Unsubscribe</TextWrapperWhite>
              </Pressable>
            ) : (
              <Pressable
                style={tw`mt-4 bg-black py-2 px-4 rounded-md`}
                onPress={subscribe}
              >
                <TextWrapperWhite>Subscribe</TextWrapperWhite>
              </Pressable>
            )}
          </View>

          {/* User Details Section */}
          <View style={tw`my-4`}>
            <TextWrapper style={tw`text-lg font-semibold`}>
              About Me
            </TextWrapper>
            <View style={tw`flex-row items-center gap-x-2 mt-2`}>
              <FontAwesome5 name="map-marker-alt" size={20} color="black" />
              <TextWrapper>Nigeria</TextWrapper>
            </View>
            <TextWrapper style={tw`text-base text-gray-700 mt-3`}>
              {profile?.user.story}
            </TextWrapper>
          </View>
        </View>
      </View>

      {/* Posts */}
      <View style={tw`flex-1`}>
        {profile?.updates.data.length > 0 ? (
          <FlatList
            data={profile.updates.data}
            renderItem={({ item }) => (
              <ProfilePosts
                post={item}
                avatar={profile?.user.avatar}
                username={profile?.user.username}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={tw`h-6`} />}
          />
        ) : (
          <Text>No posts available</Text>
        )}
      </View>

      {/* Subscription Modal */}
      <SubscriptionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={() => {
          setIsModalVisible(false);
          subscribe();
        }}
      />
    </View>
  );
}
