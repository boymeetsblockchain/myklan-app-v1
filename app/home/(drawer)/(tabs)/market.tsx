import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { SafeViewComponent } from "../../../../components/safeview";
import tw from "twrnc"; // Tailwind CSS
import { TextWrapper } from "../../../../components/textwrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  file: string;
  seller: {
    username: string;
    avatar: string;
  };
  previews: {
    name: string;
  }[];
}

interface ProductsResponse {
  current_page: number;
  data: Product[];
  last_page: number;
  next_page_url: string | null;
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
        const token = await AsyncStorage.getItem("authToken"); // Fetch Bearer token from AsyncStorage
        if (!token) {
          throw new Error("No authentication token found");
        }
        const response = await axios.get(
          `https://api.myklan.africa/public/api/shop?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use Bearer token for authorization
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
    <View style={tw`p-4 bg-white rounded-lg shadow mb-4`}>
      <TextWrapper style={tw`text-lg font-bold`}>{item.name}</TextWrapper>
      <TextWrapper style={tw`text-gray-600`}>{item.description}</TextWrapper>
      <TextWrapper style={tw`text-lg font-semibold mt-2`}>
        Price: ${item.price}
      </TextWrapper>
      <View style={tw`flex-row items-center justify-between mt-2`}>
        <TextWrapper style={tw`text-gray-500`}>
          Seller: {item.seller.username}
        </TextWrapper>
        <TouchableOpacity style={tw`bg-black py-1 px-2 rounded`}>
          <TextWrapper style={tw`text-white`}>View</TextWrapper>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeViewComponent>
      <View style={tw` flex-1`}>
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
            style={tw`bg-gray-300 py-1 px-3 rounded ${
              currentPage === 1 ? "opacity-50" : ""
            }`}
          >
            <TextWrapper style={tw`text-gray-800`}>Previous</TextWrapper>
          </TouchableOpacity>

          <TextWrapper>{`Page ${currentPage} of ${lastPage}`}</TextWrapper>

          <TouchableOpacity
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, lastPage))
            }
            disabled={currentPage === lastPage}
            style={tw`bg-gray-300 py-1 px-3 rounded ${
              currentPage === lastPage ? "opacity-50" : ""
            }`}
          >
            <TextWrapper style={tw`text-gray-800`}>Next</TextWrapper>
          </TouchableOpacity>
        </View>
      </View>
    </SafeViewComponent>
  );
}
