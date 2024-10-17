import React from "react";
import { View, TouchableOpacity } from "react-native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { TextWrapper } from "../../../components/textwrapper";

export default function ProductPage() {
  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
      {/* Button 1 - My Sales */}
      <TouchableOpacity
        style={tw`bg-black w-full p-5 rounded-lg mb-6 flex-row items-center justify-between shadow-lg border border-gray-200`}
        onPress={() => router.push("/products")}
      >
        <TextWrapper style={tw`text-white text-lg font-semibold`}>
          My Sales
        </TextWrapper>
        <Icon name="cart-outline" size={28} color="white" />
      </TouchableOpacity>

      {/* Button 2 - My Products */}
      <TouchableOpacity
        style={tw`bg-black w-full p-5 rounded-lg mb-6 flex-row items-center justify-between shadow-lg border border-gray-200`}
        onPress={() => router.push("/products/products")}
      >
        <TextWrapper style={tw`text-white text-lg font-semibold`}>
          My Products
        </TextWrapper>
        <Icon name="pricetags-outline" size={28} color="white" />
      </TouchableOpacity>

      {/* Button 3 - My Purchased Content */}
      <TouchableOpacity
        style={tw`bg-black w-full p-5 rounded-lg mb-6 flex-row items-center justify-between shadow-lg border border-gray-200`}
        onPress={() => router.push("/products/content")}
      >
        <TextWrapper style={tw`text-white text-lg font-semibold`}>
          My Purchased Content
        </TextWrapper>
        <Icon name="document-outline" size={28} color="white" />
      </TouchableOpacity>

      {/* Button 4 - My Purchased Items */}
      <TouchableOpacity
        style={tw`bg-black w-full p-5 rounded-lg mb-6 flex-row items-center justify-between shadow-lg border border-gray-200`}
        onPress={() => router.push("/products/item")}
      >
        <TextWrapper style={tw`text-white text-lg font-semibold`}>
          My Purchased Items
        </TextWrapper>
        <Icon name="cube-outline" size={28} color="white" />
      </TouchableOpacity>

      {/* Button 5 - Add a Physical Product */}
      <TouchableOpacity
        style={tw`bg-black w-full p-5 rounded-lg mb-6 flex-row items-center justify-between shadow-lg border border-gray-200`}
        onPress={() => router.push("/products/addphysical")}
      >
        <TextWrapper style={tw`text-white text-lg font-semibold`}>
          Add a Physical Product
        </TextWrapper>
        <Icon name="basket-outline" size={28} color="white" />
      </TouchableOpacity>

      {/* Button 6 - Post Content */}
      <TouchableOpacity
        style={tw`bg-black w-full p-5 rounded-lg mb-6 flex-row items-center justify-between shadow-lg border border-gray-200`}
        onPress={() => router.push("/products/post-content")}
      >
        <TextWrapper style={tw`text-white text-lg font-semibold`}>
          Post Content
        </TextWrapper>
        <Icon name="create-outline" size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-black w-full p-5 rounded-lg mb-6 flex-row items-center justify-between shadow-lg border border-gray-200`}
        onPress={() => router.push("/products/adddigital")}
      >
        <TextWrapper style={tw`text-white text-lg font-semibold`}>
          Add a Digital Product
        </TextWrapper>
        <Icon name="cloud-upload-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
