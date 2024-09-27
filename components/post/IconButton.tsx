import React from "react";
import { View, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import tw from "twrnc";

type IconButtonProps = {
  icon: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
};

const IconButton = ({ icon, text }: IconButtonProps) => {
  return (
    <View style={tw`flex-row items-center`}>
      <EvilIcons name={icon} size={22} color="gray" />
      <Text style={tw`text-xs text-gray-400`}>{text}</Text>
    </View>
  );
};

export default IconButton;
