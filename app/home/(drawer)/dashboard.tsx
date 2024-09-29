import { View, Text, ScrollView } from "react-native";
import tw from "twrnc";
import { useGetDashboardData } from "../../../services/dashboard/queries";
import { TextWrapper, TextWrapperWhite } from "../../../components/textwrapper";
import { ActivityIndicator } from "react-native";

export default function Dashboard() {
  const { data: dashboard, isLoading, error } = useGetDashboardData();

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-white`}>
        <TextWrapper style={tw`text-red-500`}>
          Unable to Fetch Dashboard Data
        </TextWrapper>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={tw`flex-1 bg-white justify-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Example: Rendering earnings and statistics from the dashboard? data
  return (
    <ScrollView style={tw`flex-1 bg-white px-4 pt-6`}>
      <View style={tw`p-4 bg-gray-900 rounded-lg mb-6`}>
        <TextWrapperWhite style={tw`mb-2`} textSize="lg" fontWeight="bold">
          Dashboard
        </TextWrapperWhite>
        <View style={tw`flex-row justify-between`}>
          <View>
            <TextWrapperWhite>Earnings This Month</TextWrapperWhite>
            <TextWrapperWhite style={tw``} fontWeight="bold" textSize="2xl">
              {dashboard?.stat_revenue_month} Kowrys
            </TextWrapperWhite>
          </View>
          <View>
            <TextWrapperWhite>Active Subscriptions</TextWrapperWhite>
            <TextWrapperWhite style={tw``} fontWeight="bold" textSize="2xl">
              {dashboard?.subscriptionsActive} kowrys
            </TextWrapperWhite>
          </View>
        </View>
      </View>

      {/* Revenue Stats Section */}
      <View style={tw`p-4 bg-gray-800 rounded-lg mb-6`}>
        <TextWrapperWhite style={tw`mb-2`} textSize="lg" fontWeight="bold">
          Revenue Statistics
        </TextWrapperWhite>
        <View style={tw`flex-row justify-between`}>
          <View>
            <TextWrapperWhite>Today</TextWrapperWhite>
            <TextWrapperWhite textSize="lg" fontWeight="bold">
              {dashboard?.stat_revenue_today} kowrys
            </TextWrapperWhite>
          </View>
          <View>
            <TextWrapperWhite>Yesterday</TextWrapperWhite>
            <TextWrapperWhite textSize="lg" fontWeight="bold">
              {dashboard?.stat_revenue_yesterday} kowrys
            </TextWrapperWhite>
          </View>
          <View>
            <TextWrapperWhite>This Week</TextWrapperWhite>
            <TextWrapperWhite textSize="lg" fontWeight="bold">
              {dashboard?.stat_revenue_week} kowrys
            </TextWrapperWhite>
          </View>
        </View>
      </View>

      {/* Net Earnings Section */}
      <View style={tw`p-4 bg-gray-800 rounded-lg mb-6`}>
        <TextWrapperWhite style={tw`text-lg font-semibold mb-2`}>
          Net Earnings
        </TextWrapperWhite>
        <View style={tw`flex-row justify-between`}>
          <View>
            <TextWrapperWhite>From Users</TextWrapperWhite>
            <TextWrapperWhite textSize="lg" fontWeight="bold">
              {dashboard?.earningNetUser} kowrys
            </TextWrapperWhite>
          </View>
          <View>
            <TextWrapperWhite>From Subscriptions</TextWrapperWhite>
            <TextWrapperWhite textSize="lg" fontWeight="bold">
              {dashboard?.earningNetSubscriptions} kowrys
            </TextWrapperWhite>
          </View>
          <View>
            <TextWrapperWhite>From Tips</TextWrapperWhite>
            <TextWrapperWhite textSize="lg" fontWeight="bold">
              {dashboard?.earningNetTips}
            </TextWrapperWhite>
          </View>
        </View>
      </View>

      {/* Additional sections can be added here for more data */}
    </ScrollView>
  );
}
