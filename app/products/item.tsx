import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeViewComponent } from "../../components/safeview";
import { TextWrapper } from "../../components/textwrapper";
import tw from "twrnc";

// Define types for the product and purchase
interface Product {
  id: number;
  user_id: number;
  name: string;
  type: string;
  price: string;
  description: string;
}

interface Purchase {
  id: number;
  transactions_id: number;
  user_id: number;
  products_id: number;
  delivery_status: string;
  created_at: string;
  product: Product;
}

interface PurchasesResponse {
  purchased_items: {
    current_page: number;
    data: Purchase[];
    total: number;
    last_page: number;
  };
}

export default function PurchasedItemPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPurchasedContent = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken"); // Retrieve the token
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://api.myklan.africa/public/api/my/purchased/items",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
            "Content-Type": "application/json",
          },
        }
      );

      const data: PurchasesResponse = await response.json();

      if (data.purchased_items && data.purchased_items.data.length > 0) {
        setPurchases(data.purchased_items.data); // Set fetched purchases
      } else {
        setError("No purchased content found");
      }
    } catch (error) {
      setError("An error occurred while fetching content");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // useEffect hook to trigger data fetch
  useEffect(() => {
    fetchPurchasedContent();
  }, []);

  if (loading) {
    return (
      <SafeViewComponent>
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#0000ff" />
          <TextWrapper>Loading purchased content...</TextWrapper>
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
        Purchased Items
      </TextWrapper>
      {purchases.length === 0 ? (
        <TextWrapper>No purchased items available</TextWrapper>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={tw`p-4 border-b border-gray-200`}>
              <TextWrapper style={styles.purchaseTitle}>
                {item.product.name}
              </TextWrapper>
              <TextWrapper style={styles.purchaseDescription}>
                Description: {item.product.description}
              </TextWrapper>
              <TextWrapper style={styles.purchasePrice}>
                Price: ₦{item.product.price}
              </TextWrapper>
              <TextWrapper style={styles.deliveryStatus}>
                Delivery Status: {item.delivery_status}
              </TextWrapper>
              <TextWrapper style={styles.purchaseDate}>
                Purchased On: {new Date(item.created_at).toLocaleDateString()}
              </TextWrapper>
            </View>
          )}
        />
      )}
    </SafeViewComponent>
  );
}

const styles = StyleSheet.create({
  purchaseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  purchaseDescription: {
    fontSize: 14,
    color: "gray",
  },
  purchasePrice: {
    fontSize: 16,
    color: "green",
  },
  deliveryStatus: {
    fontSize: 14,
    color: "blue",
  },
  purchaseDate: {
    fontSize: 12,
    color: "darkgray",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
