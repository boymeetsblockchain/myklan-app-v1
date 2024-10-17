import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { TextWrapper } from "../../components/textwrapper";
import { SafeViewComponent } from "../../components/safeview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import tw from "twrnc";
import { Product, ShopProductResponse } from "../../types/shop";
import Feather from "@expo/vector-icons/Feather";
import { WalletData } from "../../types/wallet";
import Icon from "react-native-vector-icons/Ionicons";

export default function ShopProduct() {
  const { id } = useLocalSearchParams();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [productData, setProductData] = useState<ShopProductResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          const response = await axios.get(
            `https://api.myklan.africa/public/api/shop/product/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProductData(response.data);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  console.log(productData);

  if (loading) {
    return (
      <SafeViewComponent>
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeViewComponent>
    );
  }

  if (!productData) {
    return (
      <SafeViewComponent>
        <View style={tw`flex-1 justify-center items-center`}>
          <TextWrapper style={tw`text-lg font-semibold text-gray-700`}>
            Product not found
          </TextWrapper>
        </View>
      </SafeViewComponent>
    );
  }

  const {
    product: {
      name,
      description,
      price,
      tags,
      seller,
      previews,
      shipping_fee,
      type,
      created_at,
    },
  } = productData;

  const buyProduct = () => {
    setModalVisible(true);
  };

  const editProduct = () => {};
  const buyProductNow = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await axios.post(
        "https://api.myklan.africa/public/api/buy/now/product",
        {
          id,
          description_custom_content: description,
          address,
          zip,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setModalVisible(false);
        alert("successful");
      }
    } catch (error: any) {
      setError(error);
      console.log(error);
    }
  };
  return (
    <SafeViewComponent>
      <View style={tw`p-4 bg-gray-50 flex-1`}>
        {/* Product Image */}
        <View style={tw`relative mb-4`}>
          <Image
            source={{
              uri: `https://myklan.africa/public/uploads/shop/${previews[0].name}`,
            }}
            style={tw`w-full h-48 rounded-lg`}
            resizeMode="cover"
          />
          <TextWrapper
            style={tw`absolute top-2 left-2 bg-black text-white px-3 py-1 rounded-full text-xs uppercase`}
          >
            {type}
          </TextWrapper>
        </View>

        {/* Product Title */}
        <TextWrapper style={tw`text-2xl font-extrabold text-gray-900 mb-2`}>
          {name}
        </TextWrapper>

        {/* Product Description */}
        <TextWrapper style={tw`text-base text-gray-600 mb-4`}>
          {description}
        </TextWrapper>

        {/* Buy Now Button */}
        {!productData.isPurchaseByUser && (
          <TouchableOpacity onPress={buyProduct}>
            <TextWrapper
              style={tw`bg-black text-white px-3 py-1 rounded-full text-center my-3`}
            >
              Buy Now
            </TextWrapper>
          </TouchableOpacity>
        )}

        {/* Product Price */}
        <TextWrapper style={tw`text-xl font-bold text-gray-800 mb-2`}>
          ₦{price}
        </TextWrapper>

        {/* Shipping Fee */}
        {shipping_fee && (
          <TextWrapper style={tw`text-lg text-gray-700 mb-4`}>
            Shipping Fee: ₦{shipping_fee}
          </TextWrapper>
        )}

        {/* Date Posted */}
        <TextWrapper style={tw`text-sm text-gray-500 mb-6`}>
          Posted on: {new Date(created_at).toLocaleDateString()}
        </TextWrapper>

        {/* Seller Information */}
        <View style={tw`bg-white p-4 rounded-lg shadow`}>
          <TextWrapper style={tw`text-lg font-semibold text-gray-800 mb-4`}>
            Seller Information:
          </TextWrapper>
          {seller.map((sellerInfo, index) => (
            <View key={index} style={tw`flex-row items-center mb-3`}>
              <Image
                source={{
                  uri: `https://myklan.africa/public/uploads/avatar/${sellerInfo.avatar}`,
                }}
                style={tw`w-12 h-12 rounded-full mr-4`}
              />
              <TextWrapper style={tw`text-base text-gray-700`}>
                {sellerInfo.name} ({sellerInfo.username})
              </TextWrapper>
            </View>
          ))}
        </View>

        {/* Modal for Buy Now */}
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
              {/* Wallet Info */}
              <TextWrapper style={tw`text-lg font-bold mb-4`}>
                <Icon name="wallet" size={20} color="#000" /> Wallet Balance: ₦
                {walletData?.wallet_balance}
              </TextWrapper>

              {/* Confirm Purchase */}
              <TextWrapper style={tw`text-lg font-bold mb-4`}>
                Confirm Purchase
              </TextWrapper>
              <TextWrapper style={tw`mb-4`}>
                Buy
                <TextWrapper style={tw`font-bold`}>{name}</TextWrapper> for ₦
                {price}?
              </TextWrapper>

              {/* Shipping Details */}
              <TextWrapper style={tw`text-sm font-bold mb-2`}>
                <Feather name="truck" size={16} color="black" /> Shipping
                Details
              </TextWrapper>

              <View style={tw`gap-y-2 mb-4`}>
                <TextInput
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                  style={tw`border border-gray-300 p-2 rounded-lg`}
                />
                <TextInput
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                  style={tw`border border-gray-300 p-2 rounded-lg`}
                />
                <TextInput
                  placeholder="ZIP Code"
                  value={zip}
                  onChangeText={setZip}
                  style={tw`border border-gray-300 p-2 rounded-lg`}
                />
                <TextInput
                  placeholder="Phone"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  style={tw`border border-gray-300 p-2 rounded-lg`}
                />
              </View>

              {/* Cancel Button */}
              <Pressable
                onPress={() => setModalVisible(false)}
                style={tw`px-4 py-2 bg-gray-300 rounded-lg mb-2`}
              >
                <TextWrapper style={tw`text-center text-gray-800`}>
                  Cancel
                </TextWrapper>
              </Pressable>

              {/* Confirm Purchase Button */}
              <Pressable
                onPress={buyProductNow}
                style={tw`px-4 py-2 bg-black rounded-lg`}
              >
                <TextWrapper style={tw`text-center text-white`}>
                  Confirm Purchase
                </TextWrapper>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeViewComponent>
  );
}
