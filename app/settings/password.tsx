import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { TextWrapper } from "../../components/textwrapper";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdatePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token;
    } catch (error) {
      console.error("Failed to retrieve token", error);
      return null;
    }
  };

  const handleUpdatePassword = async () => {
    // Password validation
    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters long.");
      return;
    }

    // Get token from AsyncStorage
    const token = await getToken();

    if (!token) {
      Alert.alert("Error", "Authentication token not found.");
      return;
    }

    // API call to update the password
    try {
      const response = await fetch(
        "https://api.myklan.africa/public/api/update/password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Adding Bearer token
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Success
        Alert.alert("Success", "Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
      } else {
        // Show API error message
        Alert.alert("Error", result.message || "Failed to update password.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={tw`bg-white flex-1 p-6`}>
      {/* Title */}
      <TextWrapper style={tw`text-xl font-bold mb-6`} textSize="2xl">
        Update Password
      </TextWrapper>

      {/* Old Password Input */}
      <TextWrapper style={tw`mb-2`} textSize="md">
        Old Password
      </TextWrapper>
      <TextInput
        placeholder="Enter your old password"
        placeholderTextColor="gray"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        style={tw`p-3 mb-4 bg-gray-100 rounded-lg text-lg`}
      />

      {/* New Password Input */}
      <TextWrapper style={tw`mb-2`} textSize="md">
        New Password
      </TextWrapper>
      <TextInput
        placeholder="Enter your new password"
        placeholderTextColor="gray"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={tw`p-3 mb-6 bg-gray-100 rounded-lg text-lg`}
      />

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleUpdatePassword}
        style={tw`bg-black p-3 rounded-lg flex-row justify-center items-center`}
      >
        <TextWrapper style={tw`text-white text-lg font-bold`}>
          Update Password
        </TextWrapper>
      </TouchableOpacity>
    </View>
  );
}
