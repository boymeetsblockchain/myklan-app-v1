import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeViewComponent } from "../../components/safeview";
import { TextWrapper } from "../../components/textwrapper";
import axios from "axios";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PaymentSettings() {
  const [payoutMethod, setPayoutMethod] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>(""); // Either 'Bank' or 'PayPal'
  const [paypalEmail, setPaypalEmail] = useState<string>("");
  const [paypalEmailConfirm, setPaypalEmailConfirm] = useState<string>("");
  const [bankDetails, setBankDetails] = useState<string>("");

  // Fetch the current payout method
  useEffect(() => {
    const fetchPayoutMethod = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(
          "https://api.myklan.africa/public/api/settings/payout/method",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 422) {
          alert("No Payment Method Added");
          return;
        }

        setPayoutMethod(response.data.payoutMethod);
        setSelectedMethod(response.data.payoutMethod);
      } catch (error) {
        console.error("Error fetching payout method:", error);
      }
    };

    fetchPayoutMethod();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const payload = {
        type: selectedMethod,
        ...(selectedMethod === "PayPal"
          ? {
              email_paypal: paypalEmail,
              email_paypal_confirmation: paypalEmailConfirm,
            }
          : {
              bank_details: bankDetails,
            }),
      };

      const response = await axios.post(
        `https://api.myklan.africa/public/api/settings/payout/method/${selectedMethod}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Payout method updated successfully!");
      } else {
        Alert.alert("Error", "Failed to update payout method.");
      }
    } catch (error) {
      console.error("Error updating payout method:", error);
      Alert.alert("Error", "An error occurred while updating payout method.");
    }
  };

  return (
    <SafeViewComponent>
      <View style={tw`p-4`}>
        <TextWrapper style={tw`text-lg font-bold mb-4`}>
          Payment Settings
        </TextWrapper>

        {/* Select Payout Method */}
        <TextWrapper style={tw`mb-2`}>Select Payout Method</TextWrapper>
        <TouchableOpacity
          onPress={() => setSelectedMethod("PayPal")}
          style={[
            tw`p-2 mb-2 rounded-lg`,
            selectedMethod === "PayPal" ? tw`bg-blue-500` : tw`bg-black`,
          ]}
        >
          <TextWrapper style={tw`text-center text-white`}>PayPal</TextWrapper>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedMethod("Bank")}
          style={[
            tw`p-2 mb-4 rounded-lg`,
            selectedMethod === "Bank" ? tw`bg-blue-500` : tw`bg-black`,
          ]}
        >
          <TextWrapper style={tw`text-center text-white`}>Bank</TextWrapper>
        </TouchableOpacity>

        {/* PayPal Fields */}
        {selectedMethod === "PayPal" && (
          <>
            <TextWrapper style={tw`mb-2`}>PayPal Email</TextWrapper>
            <TextInput
              value={paypalEmail}
              onChangeText={setPaypalEmail}
              placeholder="Enter PayPal Email"
              style={[
                tw`border p-2 mb-4 rounded-lg`,
                { fontFamily: "Poppins-Regular" },
              ]}
            />

            <TextWrapper style={tw`mb-2`}>Confirm PayPal Email</TextWrapper>
            <TextInput
              value={paypalEmailConfirm}
              onChangeText={setPaypalEmailConfirm}
              placeholder="Confirm PayPal Email"
              style={[
                tw`border p-2 mb-4 rounded-lg`,
                { fontFamily: "Poppins-Regular" },
              ]}
            />
          </>
        )}

        {/* Bank Details Fields */}
        {selectedMethod === "Bank" && (
          <>
            <TextWrapper style={tw`mb-2`}>Bank Details</TextWrapper>
            <TextInput
              value={bankDetails}
              onChangeText={setBankDetails}
              placeholder="Enter Bank Details"
              multiline
              style={[
                tw`border p-2 mb-4 rounded-lg`,
                { fontFamily: "Poppins-Regular" },
              ]}
            />
          </>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`bg-black p-3 rounded-lg mt-4`}
        >
          <TextWrapper style={tw`text-white text-center`}>
            Save Changes
          </TextWrapper>
        </TouchableOpacity>
      </View>
    </SafeViewComponent>
  );
}
