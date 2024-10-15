import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { SafeViewComponent } from "../../../../components/safeview";
import tw from "twrnc";
import { TextWrapper } from "../../../../components/textwrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  file: string;
  type: string;
  seller: {
    username: string;
    avatar: string;
  };
  previews: {
    name: string;
  }[];
}

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }
        const response = await axios.get(
          `https://api.myklan.africa/public/api/shop?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.products.data);
        setLastPage(response.data.products.last_page);
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(currentPage);
  }, [currentPage]);

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

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => router.push(`/shop/${item.id}`)}
      style={tw`p-4 bg-white rounded-lg shadow-md mb-4`}
    >
      {/* Product Image */}
      {item.previews[0]?.name && (
        <View style={tw`relative mb-4`}>
          <Image
            source={{
              uri: `https://myklan.africa/public/api/shop/${item.previews[0].name}`,
            }}
            style={tw`w-full h-48 rounded-lg`}
            resizeMode="cover"
          />
          <TextWrapper
            style={tw`absolute top-2 left-2 bg-gray-900 text-white px-2 py-1 rounded-full text-xs uppercase`}
          >
            {item.type}
          </TextWrapper>
          <TextWrapper
            style={tw`absolute bottom-2 right-2 bg-black text-white px-3 py-1 rounded-full font-semibold text-base`}
          >
            ₦{item.price}
          </TextWrapper>
        </View>
      )}

      {/* Product Title */}
      <TextWrapper style={tw`text-xl font-bold mb-1 text-gray-900`}>
        {item.name}
      </TextWrapper>

      {/* Product Description */}
      <TextWrapper style={tw`text-sm text-gray-600 mb-2`}>
        {item.description}
      </TextWrapper>

      {/* Seller Info */}
      <View style={tw`flex-row items-center mt-3`}>
        <Image
          source={{
            uri: `https://myklan.africa/public/uploads/avatar/${item.seller.avatar}`,
          }}
          style={tw`w-10 h-10 rounded-full mr-3`}
        />
        <TextWrapper style={tw`text-sm text-gray-500`}>
          {item.seller.username}
        </TextWrapper>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeViewComponent>
      <View style={tw`flex-1 p-4 bg-gray-50`}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={tw`pb-4`}
          ListEmptyComponent={<TextWrapper>No products found.</TextWrapper>}
        />

        {/* Pagination Controls */}
        <View style={tw`flex-row justify-between items-center mt-4`}>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={tw`px-4 py-2 bg-gray-300 rounded-md ${
              currentPage === 1 ? "opacity-50" : ""
            }`}
          >
            <TextWrapper style={tw`text-gray-700`}>Previous</TextWrapper>
          </TouchableOpacity>

          <TextWrapper>{`Page ${currentPage} of ${lastPage}`}</TextWrapper>

          <TouchableOpacity
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, lastPage))
            }
            disabled={currentPage === lastPage}
            style={tw`px-4 py-2 bg-gray-300 rounded-md ${
              currentPage === lastPage ? "opacity-50" : ""
            }`}
          >
            <TextWrapper style={tw`text-gray-700`}>Next</TextWrapper>
          </TouchableOpacity>
        </View>
      </View>
    </SafeViewComponent>
  );
}
