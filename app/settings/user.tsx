import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import { TextWrapper } from "../../components/textwrapper";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RestrictedUserPage() {
  const [restrictedUsers, setRestrictedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  // Function to get the auth token
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token;
    } catch (error) {
      console.error("Failed to retrieve token", error);
      return undefined;
    }
  };

  // Fetch restricted users from API
  const fetchRestrictedUsers = async () => {
    setIsLoading(true);
    setError(undefined);
    const token = await getToken();

    if (!token) {
      Alert.alert("Error", "Authentication token not found.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api.myklan.africa/public/api/settings/restrictions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adding Bearer token
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Set restricted users data
        setRestrictedUsers(result.data.data || []);
      } else {
        setError(result.message || "Failed to fetch restricted users.");
      }
    } catch (error: any) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // UseEffect to trigger data fetching on component mount
  useEffect(() => {
    fetchRestrictedUsers();
  }, []);

  if (isLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <TextWrapper style={tw`text-red-500`}>{error}</TextWrapper>
      </View>
    );
  }

  return (
    <View style={tw`bg-white flex-1 p-4`}>
      <TextWrapper style={tw`text-xl font-bold mb-6`} textSize="2xl">
        Restricted Users
      </TextWrapper>

      {restrictedUsers.length === 0 ? (
        <TextWrapper>No restricted users found.</TextWrapper>
      ) : (
        <FlatList
          data={restrictedUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={tw`border-b border-gray-200 py-4`}>
              <TextWrapper style={tw`text-lg font-bold`}>
                {item?.username}
              </TextWrapper>
              <TextWrapper>{item?.reason}</TextWrapper>
            </View>
          )}
        />
      )}
    </View>
  );
}
