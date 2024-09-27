import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import tw from "twrnc";
import axios from "axios";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextWrapper } from "../../components/textwrapper";

export interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  cover: string;
  hide_name: string;
  verified_id: string;
  free_subscription: string;
  featured: string;
}

const NewCreators = () => {
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewCreators = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No token found");
      }
      try {
        const response = await axios.get(
          "https://api.myklan.africa/public/api/creators/more-active",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResults(response.data.users.data);
      } catch (err: any) {
        setError("Failed to fetch new creators");
      } finally {
        setLoading(false);
      }
    };

    fetchNewCreators();
  }, []);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`px-4 pt-10`}>
        {/* Header Title */}
        <TextWrapper fontWeight="bold" textSize="lg">
          Active Creators
        </TextWrapper>

        {/* Loading or Error States */}
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <TextWrapper style={tw`text-red-500 mb-4`}>{error}</TextWrapper>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={tw`flex-1 mb-2`}>
                {/* Each Creator Row */}
                <Link href={`/profile/${item.username}`} asChild>
                  <Pressable
                    style={tw`w-full flex-row items-center border-b border-gray-700 p-4 rounded-md`}
                  >
                    <Image
                      source={{
                        uri: `https://myklan.africa/public/uploads/avatar/${item.avatar}`,
                      }}
                      style={tw`h-10 w-10 rounded-full mr-4 border border-gray-500`}
                    />
                    <View>
                      <TextWrapper>{item.username}</TextWrapper>
                      {item.hide_name === "no" && (
                        <TextWrapper style={tw`text-gray-400 text-sm`}>
                          {item.name}
                        </TextWrapper>
                      )}
                    </View>
                  </Pressable>
                </Link>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={tw`items-center`}>
                <Text style={tw`text-gray-400`}>No new creators found</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewCreators;
