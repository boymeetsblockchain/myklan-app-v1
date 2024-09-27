import { View, FlatList } from "react-native";
import { SafeViewComponent } from "../../../../components/safeview";
import { useGetUserMesaage } from "../../../../services/messages/queries";
import tw from "twrnc";
import {
  TextWrapper,
  TextWrapperWhite,
} from "../../../../components/textwrapper";
import { MessageComponent } from "../../../../components/message/messageComponent";
export default function Messages() {
  const { data: messages, isLoading, error } = useGetUserMesaage();

  const renderSkeletonLoader = () => (
    <View style={tw`p-4 bg-gray-100 mb-4 rounded-md`}>
      <View style={tw`h-4 bg-gray-300 mb-2 w-3/4 rounded`} />
      <View style={tw`h-3 bg-gray-300 mb-2 w-full rounded`} />
      <View style={tw`h-3 bg-gray-300 w-5/6 rounded`} />
    </View>
  );

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <TextWrapper style={tw`text-red-500`}>
          Unable to Fetch Messages
        </TextWrapper>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        {[...Array(20)].map((_, index) => (
          <View key={index} style={tw`w-full mb-4`}>
            {renderSkeletonLoader()}
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white px-3 `}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageComponent
            senderName={item.sender.username || "Unknown"}
            message={item.message || ""}
            avatar={item.sender.avatar}
            id={item.id}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`pb-4`}
      />
    </View>
  );
}
