import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "twrnc";
import { TextWrapper, TextWrapperWhite } from "../textwrapper";
import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
type MessageItemProps = {
  senderName: string;
  message: string;
  avatar: string;
  id: number;
  userId: number;
};

export const MessageComponent = ({
  senderName,
  message,
  avatar,
  id,
  userId,
}: MessageItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/messages/${userId}`)}
      style={tw`bg-white p-4 rounded-lg mb-4 flex-row items-start shadow-md`}
    >
      <Image
        source={{
          uri: `https://myklan.africa/public/uploads/avatar/${avatar}`,
        }}
        style={tw`w-12 h-12 rounded-full border border-gray-300 mr-4`}
      />

      <View style={tw`flex-1`}>
        <TextWrapperWhite fontWeight="bold" style={tw`text-lg text-black `}>
          {senderName}
          <MaterialIcons name="verified" size={20} color="black" />
        </TextWrapperWhite>
        <TextWrapper style={tw`text-gray-600 mt-1`}>
          {message.length > 50 ? `${message.slice(0, 50)}...` : message}
        </TextWrapper>
      </View>
    </TouchableOpacity>
  );
};
