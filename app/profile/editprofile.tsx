import React, { useState } from "react";
import { View, TextInput, Pressable, ScrollView, Alert } from "react-native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useGetUserProfile } from "../../services/profile/queries";
import { TextWrapper } from "../../components/textwrapper";
import { SafeViewComponent } from "../../components/safeview";

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
    <SafeViewComponent>
      {/* Name Field */}
      <View style={tw`mb-6`}>
        <TextWrapper style={tw`mb-2 text-lg font-semibold text-gray-700`}>
          Name
        </TextWrapper>
        <TextInput
          style={[
            {},
            tw`border border-gray-300 text-black p-3 rounded-lg focus:border-blue-500`,
          ]}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>

      {/* Username Field */}
      <View style={tw`mb-6`}>
        <TextWrapper style={tw`mb-2 text-lg font-semibold text-gray-700`}>
          Username
        </TextWrapper>
        <TextInput
          style={[
            {
              fontFamily: "Poppins-Regular",
              fontSize: 16,
            },
            tw`border border-gray-300 text-black p-3 rounded-lg focus:border-blue-500`,
          ]}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
        />
      </View>

      {/* About/Story Field */}
      <View style={tw`mb-6`}>
        <TextWrapper style={tw`mb-2 text-lg font-semibold text-gray-700`}>
          About
        </TextWrapper>
        <TextInput
          style={[
            {
              fontFamily: "Poppins-Regular",
              fontSize: 16,
            },
            tw`border border-gray-300 text-black p-3 rounded-lg focus:border-blue-500`,
          ]}
          value={story}
          onChangeText={setStory}
          placeholder="Tell us something about you"
          multiline
        />
      </View>

      {/* Address Field */}
      <View style={tw`mb-6`}>
        <TextWrapper style={tw`mb-2 text-lg font-semibold text-gray-700`}>
          Address
        </TextWrapper>
        <TextInput
          style={[
            {
              fontFamily: "Poppins-Regular",
              fontSize: 16,
            },
            tw`border border-gray-300 text-black p-3 rounded-lg focus:border-blue-500`,
          ]}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />
      </View>

      {/* City Field */}
      <View style={tw`mb-6`}>
        <TextWrapper style={tw`mb-2 text-lg font-semibold text-gray-700`}>
          Location
        </TextWrapper>
        <TextInput
          style={[
            {
              fontFamily: "Poppins-Regular",
              fontSize: 16,
            },
            tw`border border-gray-300 text-black p-3 rounded-lg focus:border-blue-500`,
          ]}
          value={city}
          onChangeText={setCity}
          placeholder="Enter your city"
        />
      </View>

      {/* Error Message */}
      {error ? (
        <TextWrapper style={tw`text-red-500 text-center mb-6`}>
          {error}
        </TextWrapper>
      ) : null}

      {/* Save Changes Button */}
      <Pressable
        style={tw`bg-black py-3 rounded-lg shadow-lg mt-4`}
        onPress={updateUser}
      >
        <TextWrapper style={tw`text-white text-center text-lg font-semibold`}>
          Save Changes
        </TextWrapper>
      </Pressable>
    </SafeViewComponent>
  );
};

export default EditProfile;
