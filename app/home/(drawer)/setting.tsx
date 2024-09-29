import React from "react";
import { View, TouchableOpacity } from "react-native";
import { TextWrapper } from "../../../components/textwrapper";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";
import { router } from "expo-router";

export default function Dashboard() {
  const handlePress = (option: string) => {
    // Add logic for each option
    console.log(option + " pressed");
  };

  return (
    <View style={tw`bg-white flex-1 p-4`}>
      <TextWrapper style={tw`text-xl font-bold mb-6`} textSize="2xl">
        Settings
      </TextWrapper>

      {/* Change Password */}
      <TouchableOpacity
        onPress={() => router.push("/settings/password")}
        style={tw`py-4 flex-row justify-between items-center border-b border-gray-300`}
      >
        <TextWrapper style={tw`text-lg`}>Change Password</TextWrapper>
        <Entypo name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>

      {/* Restricted User */}
      <TouchableOpacity
        onPress={() => router.push("/settings/user")}
        style={tw`py-4 flex-row justify-between items-center border-b border-gray-300`}
      >
        <TextWrapper style={tw`text-lg`}>Restricted User</TextWrapper>
        <Entypo name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>

      {/* Privacy and Security */}
      <TouchableOpacity
        onPress={() => router.push("/settings/security")}
        style={tw`py-4 flex-row justify-between items-center border-b border-gray-300`}
      >
        <TextWrapper style={tw`text-lg`}>Privacy and Security</TextWrapper>
        <Entypo name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={tw`py-4 flex-row justify-between items-center border-b border-gray-300  rounded-lg mt-4`}
      >
        <TextWrapper style={tw`text-lg `}>Logout</TextWrapper>
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity
        onPress={() => handlePress("Delete Account")}
        style={tw`py-4 flex-row justify-between items-center border-b border-gray-300 mt-4`}
      >
        <TextWrapper style={tw`text-lg text-red-500`}>
          Delete Account
        </TextWrapper>
      </TouchableOpacity>
    </View>
  );
}
