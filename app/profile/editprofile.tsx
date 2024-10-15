import React, { useState } from "react";
import { View, TextInput, Pressable, ScrollView, Alert } from "react-native";
import tw from "twrnc";
import { User } from "../../types/user";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useGetUserProfile } from "../../services/profile/queries";
import { TextWrapper } from "../../components/textwrapper";

const EditProfile = () => {
  const { data: profile, isLoading } = useGetUserProfile();
  const router = useRouter();
  const [name, setName] = useState(profile?.user.name || "");
  const [username, setUsername] = useState(profile?.user.username || "");
  const [story, setStory] = useState(profile?.user.story || "");
  const [address, setAddress] = useState(profile?.user.address || "");
  const [city, setCity] = useState(profile?.user.city || "");
  const [error, setError] = useState("");

  // Function to update user details
  const updateUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const updatedUser = {
        name,
        username,
        story,
        address,
        city,
      };

      // Sending updated user details to the server
      await axios.put(
        `https://api.myklan.africa/public/api/user/${profile?.user.id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Your profile has been updated.", [
        { text: "OK", onPress: () => router.push("/home") },
      ]);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      {/* Name Field */}
      <View style={tw`mb-4`}>
        <TextWrapper style={tw`mb-2`}>Name</TextWrapper>
        <TextInput
          style={tw`bg-gray-200 text-black p-2 rounded-md`}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Username Field */}
      <View style={tw`mb-4`}>
        <TextWrapper style={tw`mb-2`}>Username</TextWrapper>
        <TextInput
          style={tw`bg-gray-200 text-black p-2 rounded-md`}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* About/Story Field */}
      <View style={tw`mb-4`}>
        <TextWrapper style={tw`mb-2`}>About</TextWrapper>
        <TextInput
          style={tw`bg-gray-200 text-black p-2 rounded-md`}
          value={story}
          onChangeText={setStory}
        />
      </View>

      {/* Address Field */}
      <View style={tw`mb-4`}>
        <TextWrapper style={tw`mb-2`}>Address</TextWrapper>
        <TextInput
          style={tw`bg-gray-200 text-black p-2 rounded-md`}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* City Field */}
      <View style={tw`mb-4`}>
        <TextWrapper style={tw`mb-2`}>Location</TextWrapper>
        <TextInput
          style={tw`bg-gray-200 text-black p-2 rounded-md`}
          value={city}
          onChangeText={setCity}
        />
      </View>

      {/* Error Message */}
      {error ? (
        <TextWrapper style={tw`text-red-500 mb-4`}>{error}</TextWrapper>
      ) : null}

      {/* Save Changes Button */}
      <Pressable
        style={tw`bg-black py-2 px-4 rounded-md mt-4`}
        onPress={updateUser}
      >
        <TextWrapper style={tw`text-white text-center text-lg font-medium`}>
          Save Changes
        </TextWrapper>
      </Pressable>
    </ScrollView>
  );
};

export default EditProfile;
