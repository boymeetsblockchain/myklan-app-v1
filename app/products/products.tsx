import React, { useEffect, useState } from "react";
import { SafeViewComponent } from "../../components/safeview";
import { TextWrapper } from "../../components/textwrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";

// Product and Purchase Interfaces
interface Product {
  id: number;
  user_id: number;
  name: string;
  type: string;
  price: string;
  delivery_time: number;
  country_free_shipping: string | number;
  tags: string;
  description: string;
  file: string;
  mime: string | null;
  extension: string | null;
  size: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  shipping_fee: string;
  quantity: number;
  box_contents: string;
  category: string;
  purchases: Purchase[];
}

interface Purchase {
  id: number;
  transactions_id: number;
  user_id: number;
  products_id: number;
  delivery_status: string;
  description_custom_content: string | null;
  created_at: string;
  updated_at: string;
  address: string | null;
  city: string | null;
  zip: string | null;
  phone: string | null;
  expired_at: string | null;
}

interface ProductsResponse {
  success: boolean;
  products: {
    current_page: number;
    data: Product[];
  };
}

export default function ProductPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken"); // Retrieve the token
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://api.myklan.africa/public/api/my/products",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
            "Content-Type": "application/json",
          },
        }
      );

      const data: ProductsResponse = await response.json();

      if (data.success) {
        setProducts(data.products.data); // Set fetched products
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      setError("An error occurred while fetching products");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // useEffect hook to trigger data fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <SafeViewComponent>
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#0000ff" />
          <TextWrapper>Loading products...</TextWrapper>
        </View>
      </SafeViewComponent>
    );
  }

  if (error) {
    return (
      <SafeViewComponent>
        <View style={tw`flex-1 justify-center items-center`}>
          <TextWrapper style={styles.errorText}>{error}</TextWrapper>
        </View>
      </SafeViewComponent>
    );
  }

  return (
    <SafeViewComponent>
      <TextWrapper style={tw`text-center my-5 text-2xl`} fontWeight="bold">
        My Products
      </TextWrapper>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={tw`p-4 border-b border-gray-200`}>
            <TextWrapper style={styles.productName}>{item.name}</TextWrapper>
            <TextWrapper style={styles.productPrice}>
              Price: ${item.price}
            </TextWrapper>
            <TextWrapper style={styles.productCategory}>
              Category: {item.category}
            </TextWrapper>
            <TextWrapper style={styles.productDescription}>
              Description: {item.description}
            </TextWrapper>
            <TextWrapper style={styles.productDate}>
              Date Created: {new Date(item.created_at).toLocaleDateString()}
            </TextWrapper>
          </View>
        )}
      />
    </SafeViewComponent>
  );
}

const styles = StyleSheet.create({
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "green",
  },
  productCategory: {
    fontSize: 14,
    color: "gray",
  },
  productDescription: {
    fontSize: 12,
    color: "darkgray",
  },
  productDate: {
    fontSize: 12,
    color: "blue",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
