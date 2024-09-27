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
          "https://api.myklan.africa/public/api/creators/free",
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
        <TextWrapper fontWeight="bold" textSize="lg">
          Free Creators
        </TextWrapper>

        {loading ? (
          <ActivityIndicator size="large" color="#0000" />
        ) : error ? (
          <Text style={tw`text-red-500 mb-4`}>{error}</Text>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={tw`flex-1 mb-2`}>
                <Link href={`/profile/${item.username}`} asChild>
                  <Pressable
                    style={tw`w-full flex-row items-center border-b  border-gray-800 p-4 rounded-md`}
                  >
                    <Image
                      source={{
                        uri: `https://myklan.africa/public/uploads/avatar/${item.avatar}`,
                      }}
                      style={tw`h-10 w-10 rounded-full mr-4`} // Avatar size with margin
                    />
                    <View>
                      <TextWrapper style={tw``}>{item.username}</TextWrapper>
                      {item.hide_name === "no" && (
                        <Text style={tw`text-gray-400 text-sm`}>
                          {item.name}
                        </Text>
                      )}
                    </View>
                  </Pressable>
                </Link>
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={tw`items-center`}>
                <TextWrapper style={tw`text-gray-400`}>
                  No new creators found
                </TextWrapper>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewCreators;
