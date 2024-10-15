import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import { useGetMySubscription } from "../../../services/subscription/queries";
import tw from "twrnc";
import { TextWrapper } from "../../../components/textwrapper";

const { width } = Dimensions.get("window");

export default function Subscription() {
  const { data: subscription, isLoading, error } = useGetMySubscription();

  if (isLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator color={"#000"} size={"large"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <TextWrapper style={tw`text-red-500`}>
          Unable to Fetch My Subscriptions
        </TextWrapper>
      </View>
    );
  }

  // Check if subscription data is present
  const subscriptions = subscription?.data.data || [];

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <TextWrapper
        style={tw`text-center my-6`}
        fontWeight="bold"
        textSize="2xl"
      >
        My Subscriptions
      </TextWrapper>

      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={tw`flex-1 items-center justify-center`}>
            <TextWrapper>No subscriptions available.</TextWrapper>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={tw`flex-row items-center bg-white p-4 rounded-lg mb-3 shadow`}
          >
            {/* Avatar */}
            <View style={tw`mr-3`}>
              {item.creator.avatar ? (
                <Image
                  source={{
                    uri: `https://myklan.africa/public/uploads/avatar/${item.creator.avatar}`,
                  }}
                  style={tw`h-10 w-10 rounded-full`}
                />
              ) : (
                <View style={tw`w-12 h-12 rounded-full bg-gray-300`} />
              )}
            </View>

            {/* Subscription Info */}
            <View style={tw`flex-1`}>
              <TextWrapper
                fontWeight="bold"
                textSize="lg"
                style={tw`text-gray-900`}
              >
                {item.creator.name}
              </TextWrapper>
              <TextWrapper style={tw`text-gray-500`}>
                Subscribed: {new Date(item.created_at).toLocaleDateString()}
              </TextWrapper>
            </View>

            {/* Subscription Details */}
            <View style={tw`items-end`}>
              <TextWrapper style={tw`text-gray-700`}>
                Interval: {item.interval}
              </TextWrapper>
              <TextWrapper style={tw`text-gray-700`}>
                Ends at:{" "}
                {item.ends_at
                  ? new Date(item.ends_at).toLocaleDateString()
                  : "N/A"}
              </TextWrapper>
              <TextWrapper
                style={tw`text-${
                  item.cancelled === "no" ? "green-500" : "red-500"
                } font-bold`}
              >
                {item.cancelled === "no" ? "Active" : "Cancelled"}
              </TextWrapper>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
