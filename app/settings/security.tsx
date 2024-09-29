import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Switch, Alert } from "react-native";
import { TextWrapper } from "../../components/textwrapper";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Define types for the API response
interface Agent {
  id: number;
  user_id: number;
  ip: string;
  device: string;
  device_type: string;
  browser: string;
  platform: string;
  country: string | null;
  created_at: string;
  updated_at: string;
}

interface CurrentSession {
  id: number;
  user_id: number;
  ip: string;
  device: string;
  device_type: string;
  browser: string;
  platform: string;
  country: string | null;
  created_at: string;
  updated_at: string;
}

interface Privacy {
  hide_profile: string;
  hide_last_seen: string;
  hide_count_subscribers: string;
  hide_my_country: string;
  show_my_birthdate: string;
  active_status_online: string;
  two_factor_auth: string;
  posts_privacy: number;
}

interface SecurityResponse {
  success: boolean;
  agents: Agent[];
  currentSession: CurrentSession;
  privacy: Privacy[];
}

export default function SecurityPage() {
  const [data, setData] = useState<SecurityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to get the auth token
  const getToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token;
    } catch (error) {
      console.error("Failed to retrieve token", error);
      return null;
    }
  };

  // Fetch security data using Axios
  const fetchSecurityData = async () => {
    setIsLoading(true);
    setError(null);
    const token = await getToken();

    if (!token) {
      Alert.alert("Error", "Authentication token not found.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get<SecurityResponse>(
        "https://api.myklan.africa/public/api/privacy/security",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adding Bearer token
          },
        }
      );
      setData(response.data); // Set the fetched data
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to fetch security data."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update privacy settings
  const updatePrivacySettings = async (
    setting: keyof Privacy,
    value: string
  ) => {
    const token = await getToken();

    if (!token) {
      Alert.alert("Error", "Authentication token not found.");
      return;
    }

    try {
      const updatedSettings = { ...data?.privacy[0], [setting]: value };
      await axios.post(
        "https://api.myklan.africa/public/api/update/privacy/security",
        updatedSettings,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData((prevState: any) =>
        prevState ? { ...prevState, privacy: [updatedSettings] } : prevState
      );
      Alert.alert("Success", `${setting} updated successfully.`);
    } catch (error) {
      Alert.alert("Error", "Failed to update settings.");
    }
  };

  useEffect(() => {
    fetchSecurityData();
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

  if (!data) {
    return null; // Return nothing if no data is loaded yet
  }

  const { agents, currentSession, privacy } = data;

  return (
    <View style={tw`bg-white flex-1 p-6`}>
      {/* Current Session Info */}

      {/* Privacy Settings with Switch Buttons */}
      <TextWrapper style={tw`text-xl font-bold mt-6 mb-4`} textSize="2xl">
        Privacy Settings
      </TextWrapper>
      {privacy && (
        <View>
          {Object.keys(privacy[0]).map((key) => (
            <View
              key={key}
              style={tw`py-1.5 flex-row justify-between items-center border-b border-gray-200`}
            >
              <TextWrapper style={tw`text-lg capitalize`}>
                {key.replace(/_/g, " ")}
              </TextWrapper>
              <Switch
                trackColor={{ false: "#767577", true: "#000" }}
                thumbColor={
                  privacy[0][key as keyof Privacy] === "yes"
                    ? "#000"
                    : "#f4f3f4"
                }
                value={privacy[0][key as keyof Privacy] === "yes"}
                onValueChange={(value) =>
                  updatePrivacySettings(
                    key as keyof Privacy,
                    value ? "yes" : "no"
                  )
                }
              />
            </View>
          ))}
        </View>
      )}

      {/* Previous Sessions */}
      <TextWrapper style={tw`text-xl font-bold mb-4`} textSize="2xl">
        Current Session
      </TextWrapper>
      <View style={tw`border-b border-gray-200 p-4`}>
        <TextWrapper>IP: {currentSession.ip}</TextWrapper>
        <TextWrapper>Device: {currentSession.device}</TextWrapper>
        <TextWrapper>Device Type: {currentSession.device_type}</TextWrapper>
        <TextWrapper>Browser: {currentSession.browser}</TextWrapper>
        <TextWrapper>Platform: {currentSession.platform}</TextWrapper>
        <TextWrapper>
          Last Updated:{" "}
          {new Date(currentSession.updated_at).toLocaleDateString()}
        </TextWrapper>
      </View>
      <TextWrapper style={tw`text-xl font-bold mt-6 mb-4`} textSize="2xl">
        Previous Sessions
      </TextWrapper>
      <FlatList
        data={agents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tw`border-b border-gray-200 p-4`}>
            <TextWrapper>IP: {item.ip}</TextWrapper>
            <TextWrapper>Device: {item.device}</TextWrapper>
            <TextWrapper>Device Type: {item.device_type}</TextWrapper>
            <TextWrapper>Browser: {item.browser}</TextWrapper>
            <TextWrapper>Platform: {item.platform}</TextWrapper>
            <TextWrapper>Country: {item.country}</TextWrapper>
            <TextWrapper>
              Logged In At: {new Date(item.created_at).toLocaleDateString()}
            </TextWrapper>
            <TextWrapper>
              Last Updated: {new Date(item.updated_at).toLocaleDateString()}
            </TextWrapper>
          </View>
        )}
      />
    </View>
  );
}
