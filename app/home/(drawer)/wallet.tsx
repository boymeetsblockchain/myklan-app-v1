import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { SafeViewComponent } from "../../../components/safeview";
import tw from "twrnc"; // Tailwind CSS
import { TextWrapper } from "../../../components/textwrapper"; // Assuming you have a TextWrapper component
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons"; // Importing icons

interface Deposit {
  description?: string; // Modify as per your actual data structure
}

interface WalletData {
  wallet_balance: string;
  transferable_balance: string;
  equivalent_money: string;
  deposits: {
    data: Deposit[];
  };
}

export default function Wallet() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken"); // Fetch Bearer token from AsyncStorage
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "https://api.myklan.africa/public/api/my/wallet",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use Bearer token for authorization
            },
          }
        );

        setWalletData(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  if (loading) {
    return (
      <SafeViewComponent>
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeViewComponent>
    );
  }

  if (error) {
    return (
      <SafeViewComponent>
        <View style={tw`flex-1 justify-center items-center`}>
          <TextWrapper style={tw`text-red-600 text-lg`}>{error}</TextWrapper>
        </View>
      </SafeViewComponent>
    );
  }

  return (
    <SafeViewComponent>
      <View style={tw`p-4 bg-white flex-1`}>
        <TextWrapper style={tw`text-2xl font-bold mb-4 text-gray-800`}>
          Wallet
        </TextWrapper>

        <View style={tw`bg-gray-100 p-4 rounded-lg shadow-md mb-4`}>
          <TextWrapper style={tw`text-lg mb-2`}>
            <Icon name="wallet" size={20} color="#000" /> Wallet Balance:{" "}
            {walletData?.wallet_balance}
          </TextWrapper>
          <TextWrapper style={tw`text-lg mb-2`}>
            <Icon name="cash" size={20} color="#000" /> Transferable Balance:{" "}
            {walletData?.transferable_balance}
          </TextWrapper>
          <TextWrapper style={tw`text-gray-600 mb-4`}>
            <Icon name="information-circle" size={20} color="#000" />{" "}
            {walletData?.equivalent_money}
          </TextWrapper>
        </View>

        <TextWrapper style={tw`text-xl font-semibold mt-4 mb-2 text-gray-800`}>
          Deposit History
        </TextWrapper>
        <FlatList
          data={walletData?.deposits.data}
          keyExtractor={(item, index) => index.toString()} // Adjust as per your data structure
          renderItem={({ item }) => (
            <View
              style={tw`p-3 border border-gray-300 rounded mb-2 flex-row items-center`}
            >
              <Icon name="cash" size={20} color="#000" style={tw`mr-2`} />
              <TextWrapper style={tw`flex-1`}>
                {item.description || "Deposit Description"}{" "}
                {/* Modify as per actual data structure */}
              </TextWrapper>
            </View>
          )}
          contentContainerStyle={tw`pb-4`}
          ListEmptyComponent={<TextWrapper>No deposits found.</TextWrapper>}
        />
      </View>
    </SafeViewComponent>
  );
}
