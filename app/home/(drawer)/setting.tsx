import React from "react";
import { View, TouchableOpacity } from "react-native";
import { TextWrapper } from "../../../components/textwrapper";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";
import { router } from "expo-router";
import { Colors } from "../../../utils/colors";

export default function Dashboard() {
  const handlePress = (option: string) => {
    console.log(option + " pressed");
  };

  return (
    <View style={tw`bg-white/50 flex-1 p-6`}>
      {/* Change Password */}
      <TouchableOpacity
        onPress={() => router.push("/settings/password")}
        style={tw`py-4 px-5 flex-row justify-between items-center bg-white rounded-lg shadow-sm mb-4`}
      >
        <TextWrapper style={tw`text-lg font-medium`}>
          Change Password
        </TextWrapper>
        <Entypo name="chevron-right" size={24} color={Colors.grey} />
      </TouchableOpacity>

      {/* Payment Settings */}
      <TouchableOpacity
        onPress={() => router.push("/settings/payment")}
        style={tw`py-4 px-5 flex-row justify-between items-center bg-white rounded-lg shadow-sm mb-4`}
      >
        <TextWrapper style={tw`text-lg font-medium`}>
          Payment Settings
        </TextWrapper>
        <Entypo name="chevron-right" size={24} color={Colors.grey} />
      </TouchableOpacity>

      {/* Withdrawal Settings */}
      <TouchableOpacity
        onPress={() => router.push("/settings/withdraw")}
        style={tw`py-4 px-5 flex-row justify-between items-center bg-white rounded-lg shadow-sm mb-4`}
      >
        <TextWrapper style={tw`text-lg font-medium`}>
          Withdrawal Settings
        </TextWrapper>
        <Entypo name="chevron-right" size={24} color={Colors.grey} />
      </TouchableOpacity>

      {/* Restricted User */}
      <TouchableOpacity
        onPress={() => router.push("/settings/user")}
        style={tw`py-4 px-5 flex-row justify-between items-center bg-white rounded-lg shadow-sm mb-4`}
      >
        <TextWrapper style={tw`text-lg font-medium`}>
          Restricted User
        </TextWrapper>
        <Entypo name="chevron-right" size={24} color={Colors.grey} />
      </TouchableOpacity>

      {/* Privacy and Security */}
      <TouchableOpacity
        onPress={() => router.push("/settings/security")}
        style={tw`py-4 px-5 flex-row justify-between items-center bg-white rounded-lg shadow-sm mb-4`}
      >
        <TextWrapper style={tw`text-lg font-medium`}>
          Privacy and Security
        </TextWrapper>
        <Entypo name="chevron-right" size={24} color={Colors.grey} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/settings/security")}
        style={tw`py-4 px-5 flex-row justify-between items-center bg-white rounded-lg shadow-sm mb-4`}
      >
        <TextWrapper style={tw`text-lg font-medium`}>Notifications</TextWrapper>
        <Entypo name="chevron-right" size={24} color={Colors.grey} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/settings/security")}
        style={tw`py-4 px-5 flex-row justify-between items-center bg-white rounded-lg shadow-sm mb-4`}
      >
        <TextWrapper style={tw`text-lg font-medium`}>Subscription</TextWrapper>
        <Entypo name="chevron-right" size={24} color={Colors.grey} />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={tw`py-4 px-5 flex-row justify-between items-center bg-red-500 rounded-lg shadow-sm mb-6`}
      >
        <TextWrapper style={tw`text-lg font-bold text-white`}>
          Logout
        </TextWrapper>
        <Entypo name="chevron-right" size={24} color="white" />
      </TouchableOpacity>

      {/* Delete Account */}
      <TouchableOpacity
        onPress={() => handlePress("Delete Account")}
        style={tw`py-4 px-5 flex-row justify-between items-center bg-white border border-red-500 rounded-lg shadow-sm`}
      >
        <TextWrapper style={tw`text-lg font-medium text-red-500`}>
          Delete Account
        </TextWrapper>
        <Entypo name="chevron-right" size={24} color={"red"} />
      </TouchableOpacity>
    </View>
  );
}
