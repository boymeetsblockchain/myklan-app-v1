import React, { useState } from "react";
import { View, Text, Modal, Pressable, TextInput, Alert } from "react-native";
import tw from "twrnc";

export const SubscriptionModal = ({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (interval: string, paymentGateway: string) => void;
}) => {
  const [interval, setInterval] = useState<string>("monthly");
  const [paymentGateway, setPaymentGateway] = useState<string>("wallet");

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
      >
        <View style={tw`bg-white w-4/5 p-6 rounded-lg`}>
          <Text style={tw`text-xl font-bold mb-4`}>
            Choose Subscription Plan
          </Text>

          <Text style={tw`text-gray-800 mb-2`}>Select Interval:</Text>
          <Pressable style={tw`mb-4`} onPress={() => setInterval("monthly")}>
            <Text
              style={tw`${
                interval === "monthly" ? "text-blue-500" : "text-black"
              } font-medium`}
            >
              Monthly
            </Text>
          </Pressable>
          <Pressable style={tw`mb-4`} onPress={() => setInterval("weekly")}>
            <Text
              style={tw`${
                interval === "weekly" ? "text-blue-500" : "text-black"
              } font-medium`}
            >
              Weekly
            </Text>
          </Pressable>

          <Text style={tw`text-gray-800 mb-2`}>Select Payment Method:</Text>
          <Pressable
            style={tw`mb-4`}
            onPress={() => setPaymentGateway("wallet")}
          >
            <Text
              style={tw`${
                paymentGateway === "wallet" ? "text-blue-500" : "text-black"
              } font-medium`}
            >
              Wallet
            </Text>
          </Pressable>

          <Pressable
            style={tw`bg-blue-500 py-2 px-4 rounded-md mt-4`}
            onPress={() => {
              onSubmit(interval, paymentGateway);
              onClose();
            }}
          >
            <Text style={tw`text-white text-center`}>Subscribe</Text>
          </Pressable>

          <Pressable style={tw`mt-4`} onPress={onClose}>
            <Text style={tw`text-red-500 text-center`}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
