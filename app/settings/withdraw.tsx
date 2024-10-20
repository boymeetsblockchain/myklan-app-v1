import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import axios from "axios";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeViewComponent } from "../../components/safeview";
import { TextWrapper } from "../../components/textwrapper";

export default function WithDraw() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]); // Array to hold withdrawal data
  const [amount, setAmount] = useState<string>(""); // Withdrawal amount
  const [loading, setLoading] = useState<boolean>(false); // Loading state for submit actions

  // Fetch the current withdrawal settings
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(
          "https://api.myklan.africa/public/api/settings/withdrawals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWithdrawals(response.data.withdrawals || []); // Set withdrawals data
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
        Alert.alert("Error", "Failed to load withdrawals.");
      }
    };

    fetchWithdrawals();
  }, []);

  // Handle withdrawal submission
  const handleWithdrawal = async () => {
    if (!amount) {
      Alert.alert("Error", "Please enter an amount.");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        "https://api.myklan.africa/public/api/settings/withdrawals",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Withdrawal request submitted!");
        setAmount(""); // Clear amount after successful submission
      } else {
        Alert.alert("Error", "Failed to submit withdrawal request.");
      }
    } catch (error) {
      console.error("Error making withdrawal:", error);
      Alert.alert("Error", "An error occurred while making withdrawal.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deletion of a withdrawal by ID
  const handleDeleteWithdrawal = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        `https://api.myklan.africa/public/api/delete/withdrawal/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Withdrawal method deleted!");
        // Remove deleted withdrawal from the list
        setWithdrawals(
          withdrawals.filter((withdrawal) => withdrawal.id !== id)
        );
      } else {
        Alert.alert("Error", "Failed to delete withdrawal method.");
      }
    } catch (error) {
      console.error("Error deleting withdrawal:", error);
      Alert.alert("Error", "An error occurred while deleting the withdrawal.");
    }
  };

  return (
    <SafeViewComponent>
      <View style={tw`p-4`}>
        <TextWrapper style={tw`text-lg font-bold mb-4`}>
          Withdraw Funds
        </TextWrapper>

        {/* Withdrawal amount input */}
        <TextWrapper style={tw`mb-2`}>Enter Amount to Withdraw</TextWrapper>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
          style={[
            tw`border p-2 mb-4 rounded-lg`,
            { fontFamily: "Poppins-Regular" },
          ]}
        />

        {/* Submit button for withdrawal */}
        <TouchableOpacity
          onPress={handleWithdrawal}
          disabled={loading}
          style={[tw`bg-black p-3 rounded-lg`, loading && tw`opacity-50`]}
        >
          <TextWrapper style={tw`text-white text-center`}>
            {loading ? "Processing..." : "Submit Withdrawal"}
          </TextWrapper>
        </TouchableOpacity>

        {/* Display existing withdrawals */}
        <TextWrapper style={tw`text-lg font-bold mt-6 mb-4`}>
          Existing Withdrawals
        </TextWrapper>
        <FlatList
          data={withdrawals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={tw`p-2 border mb-2 rounded-lg`}>
              <TextWrapper style={tw`text-base mb-1`}>
                Amount: ${item.amount}
              </TextWrapper>
              <TextWrapper style={tw`text-base mb-1`}>
                Status: {item.status}
              </TextWrapper>

              {/* Delete button */}
              <TouchableOpacity
                onPress={() => handleDeleteWithdrawal(item.id)}
                style={tw`bg-red-500 p-2 rounded-lg mt-2`}
              >
                <TextWrapper style={tw`text-white text-center`}>
                  Delete
                </TextWrapper>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <TextWrapper style={tw`text-center mt-4`}>
              No withdrawals yet.
            </TextWrapper>
          }
        />
      </View>
    </SafeViewComponent>
  );
}
