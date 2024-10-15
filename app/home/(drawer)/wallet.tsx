import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  TextInput,
  Modal,
  Image,
  Platform,
} from "react-native";
import axios from "axios";
import { SafeViewComponent } from "../../../components/safeview";
import tw from "twrnc"; // Tailwind CSS
import { TextWrapper } from "../../../components/textwrapper"; // Assuming you have a TextWrapper component
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons"; // Importing icons
import * as ImagePicker from "expo-image-picker"; // Image picker for file selection
import { WalletData } from "../../../types/wallet";

export default function Wallet() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState<string | null>(null); // For the image file path
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal state

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "https://api.myklan.africa/public/api/my/wallet",
          {
            headers: {
              Authorization: `Bearer ${token}`,
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

  // Function to fund wallet
  const uriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const fundWallet = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      formData.append("payment_gateway", "Flutterwave");
      formData.append("agree_terms", "1");
      formData.append("amount", amount);

      const response = await axios.post(
        "https://api.myklan.africa/public/api/add/fund",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure proper header
          },
        }
      );

      if (response.data) {
        alert("Wallet funded successfully!");
        setModalVisible(false); // Close modal
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  };

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

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
        {/* Wallet Info */}
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

        {/* Deposit History */}
        <TextWrapper style={tw`text-xl font-semibold mt-4 mb-2 text-gray-800`}>
          Deposit History
        </TextWrapper>
        <FlatList
          data={walletData?.deposits.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={tw`p-3 border border-gray-300 rounded mb-2 flex-row items-center`}
            >
              <Icon name="cash" size={20} color="#000" style={tw`mr-2`} />
              <TextWrapper style={tw`flex-1`}>
                {item.description || "Deposit Description"}
              </TextWrapper>
            </View>
          )}
          contentContainerStyle={tw`pb-4`}
          ListEmptyComponent={<TextWrapper>No deposits found.</TextWrapper>}
        />

        {/* Fund Wallet Button */}
        <Pressable
          style={tw`bg-black py-3 px-2 mt-4`}
          onPress={() => setModalVisible(true)}
        >
          <TextWrapper style={tw`text-white text-center`}>
            Fund Wallet
          </TextWrapper>
        </Pressable>
      </View>

      {/* Modal for Funding Wallet */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View style={tw`bg-white p-6 rounded-lg w-100`}>
            <TextWrapper style={tw`text-lg font-bold mb-4`}>
              Fund Wallet
            </TextWrapper>

            {/* Amount Input */}
            <TextInput
              placeholder="Enter Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={tw`border border-gray-300 p-2 rounded-lg mb-4`}
            />

            {/* Image Upload */}
            <Pressable
              style={tw`bg-gray-200 p-3 rounded-lg`}
              onPress={pickImage}
            >
              <TextWrapper style={tw`text-center text-gray-700`}>
                {image ? "Change Image" : "Upload Image"}
              </TextWrapper>
            </Pressable>
            {image && (
              <Image
                source={{ uri: image }}
                style={tw`w-full h-40 mt-4 rounded-lg`}
                resizeMode="contain"
              />
            )}

            {/* Confirm and Cancel Buttons */}
            <View style={tw`flex-row justify-between mt-6`}>
              <Pressable
                style={tw`bg-gray-300 py-2 px-4 rounded-lg`}
                onPress={() => setModalVisible(false)}
              >
                <TextWrapper>Cancel</TextWrapper>
              </Pressable>

              <Pressable
                style={tw`bg-black py-2 px-4 rounded-lg`}
                onPress={fundWallet}
              >
                <TextWrapper style={tw`text-white`}>Confirm</TextWrapper>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeViewComponent>
  );
}
