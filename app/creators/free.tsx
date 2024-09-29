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
import { Link, router } from "expo-router";
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
      {/* Page Header */}
      <View style={tw`px-4 pt-10`}>
        <TextWrapper fontWeight="bold" textSize="lg" style={tw`text-black`}>
          Explore our free Creators
        </TextWrapper>
        <Text style={tw`text-gray-400 mb-4`}>
          The best of content creators are here
        </Text>
      </View>

      {/* Loading or Error States */}
      <View style={tw`flex-1 px-4`}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <TextWrapper style={tw`text-red-500 mb-4`}>{error}</TextWrapper>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={tw`flex-1 mb-6`}>
                {/* Creator Card */}
                <View style={tw`bg-white rounded-md border border-gray-300`}>
                  <Image
                    source={{
                      uri: `https://myklan.africa/public/uploads/cover/${item.cover}`,
                    }}
                    style={tw`h-40 w-full rounded-t-md`}
                    resizeMode="cover"
                  />

                  {/* Avatar and Info */}
                  <View style={tw`items-center mt-[-40px]`}>
                    {/* Avatar */}
                    <Image
                      source={{
                        uri: `https://myklan.africa/public/uploads/avatar/${item.avatar}`,
                      }}
                      style={tw`h-20 w-20 rounded-full border-4 border-white mb-4`}
                    />

                    {/* Creator Info */}
                    <TextWrapper style={tw`text-black text-lg`}>
                      {item.username}
                    </TextWrapper>
                    {item.hide_name === "no" && (
                      <TextWrapper style={tw`text-gray-500 text-sm`}>
                        {item.name}
                      </TextWrapper>
                    )}
                  </View>

                  {/* CTA Buttons */}
                  <View style={tw`flex-row justify-center mt-4 pb-4`}>
                    <Pressable
                      onPress={() => router.push(`/profile/${item.username}`)}
                      style={tw`bg-gray-800 py-2 px-4 rounded-md mr-2`}
                    >
                      <TextWrapper style={tw`text-white`}>
                        Go to Page
                      </TextWrapper>
                    </Pressable>
                    <Pressable
                      style={tw`bg-white py-2 shadow-md px-4 rounded-md`}
                    >
                      <TextWrapper style={tw``}>Free</TextWrapper>
                    </Pressable>
                  </View>
                </View>
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
