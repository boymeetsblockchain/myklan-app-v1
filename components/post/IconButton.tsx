import React from "react";
import { TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { TextWrapper } from "../textwrapper";

type IconButtonProps = {
  icon: React.ComponentProps<typeof EvilIcons>["name"];
  text?: string | number;
  onPress?: () => void;
};

const IconButton = ({ icon, text, onPress }: IconButtonProps) => {
  return (
    <TouchableOpacity style={tw`flex-row items-center`} onPress={onPress}>
      <EvilIcons name={icon} size={22} color="gray" />
      <TextWrapper textSize="sm" style={tw` text-gray-400`}>
        {text}
      </TextWrapper>
    </TouchableOpacity>
  );
};

export default IconButton;
