import { View, FlatList, ActivityIndicator, Dimensions } from "react-native";
import { useGetMySubscription } from "../../../services/subscription/queries";
import tw from "twrnc";
import { TextWrapper } from "../../../components/textwrapper";

const { width } = Dimensions.get("window");

export default function Subscription() {
  const { data: subscription, isLoading, error } = useGetMySubscription();
  console.log("Subscription Data:", subscription);

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
          Unable to Fetch My Subscribers
        </TextWrapper>
      </View>
    );
  }

  // Check if subscription data is present
  const subscriptions = subscription?.data || [];
  console.log(subscriptions);

  return (
    <View style={tw`flex-1  bg-white p-4 `}>
      <TextWrapper
        style={tw`text-center my-10`}
        fontWeight="bold"
        textSize="2xl"
      >
        My Subscribers
      </TextWrapper>
      <View style={tw`border-b border-gray-300`}>
        <View style={tw`flex-row justify-between py-2`}>
          <TextWrapper
            style={[tw`font-bold`, { width: width * 0.2 }]}
            textSize="md"
          >
            Subscribed
          </TextWrapper>
          <TextWrapper
            style={[tw`font-bold`, { width: width * 0.2 }]}
            textSize="md"
          >
            Date
          </TextWrapper>
          <TextWrapper
            style={[tw`font-bold`, { width: width * 0.2 }]}
            textSize="md"
          >
            Interval
          </TextWrapper>
          <TextWrapper
            style={[tw`font-bold`, { width: width * 0.2 }]}
            textSize="md"
          >
            Ends at
          </TextWrapper>
          <TextWrapper
            style={[tw`font-bold`, { width: width * 0.2 }]}
            textSize="md"
          >
            Status
          </TextWrapper>
        </View>
      </View>
      {subscriptions.length === 0 ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <TextWrapper>No subscribers available.</TextWrapper>
        </View>
      ) : (
        <FlatList
          data={subscriptions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={tw`flex-row justify-between py-2 border-b border-gray-200`}
            >
              <TextWrapper style={[tw`text-left`, { width: width * 0.2 }]}>
                {item.creator.name}
              </TextWrapper>
              <TextWrapper style={[tw`text-left`, { width: width * 0.2 }]}>
                {new Date(item.created_at).toLocaleDateString()}
              </TextWrapper>
              <TextWrapper style={[tw`text-left`, { width: width * 0.2 }]}>
                {item.interval}
              </TextWrapper>
              <TextWrapper style={[tw`text-left`, { width: width * 0.2 }]}>
                {item.ends_at
                  ? new Date(item.ends_at).toLocaleDateString()
                  : "N/A"}
              </TextWrapper>
              <TextWrapper style={[tw`text-left`, { width: width * 0.2 }]}>
                {item.cancelled === "no" ? "Active" : "Cancelled"}
              </TextWrapper>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
