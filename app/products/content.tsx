import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeViewComponent } from "../../components/safeview";
import { TextWrapper } from "../../components/textwrapper";
import tw from "twrnc";

interface Purchase {
  id: number;
  title: string | null;
  description: string;
  user_id: number;
  date: string;
  price: string;
  status: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

interface PurchasesResponse {
  updates: {
    current_page: number;
    data: Purchase[];
    total: number;
    last_page: number;
  };
  users: User[];
}

export default function PurchasedContentPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [users, setUsers] = useState<User[]>([]);
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
        "https://api.myklan.africa/public/api/my/purchases",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
            "Content-Type": "application/json",
          },
        }
      );

      const data: PurchasesResponse = await response.json();

      if (data.updates && data.users) {
        setPurchases(data.updates.data); // Set fetched purchases
        setUsers(data.users); // Set users data
      } else {
        setError("Failed to fetch purchased content");
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

  const getUserById = (userId: number) =>
    users.find((user) => user.id === userId);

  return (
    <SafeViewComponent>
      <TextWrapper style={tw`text-center my-5 text-2xl`} fontWeight="bold">
        Purchased Content
      </TextWrapper>
      {purchases.length === 0 ? (
        <TextWrapper style={tw`text-center my-5 text-2xl`}>
          No Purchased Content
        </TextWrapper>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const user = getUserById(item.user_id);
            return (
              <View style={tw`p-4 border-b border-gray-200`}>
                <TextWrapper style={styles.purchaseTitle}>
                  {item.title || "Untitled Post"}
                </TextWrapper>
                <TextWrapper style={styles.purchaseDescription}>
                  Description: {item.description}
                </TextWrapper>
                <TextWrapper style={styles.purchasePrice}>
                  Price: ₦{item.price}
                </TextWrapper>
                {user && (
                  <TextWrapper style={styles.userDetails}>
                    By: {user.name} ({user.username})
                  </TextWrapper>
                )}
                <TextWrapper style={styles.purchaseDate}>
                  Date: {new Date(item.date).toLocaleDateString()}
                </TextWrapper>
              </View>
            );
          }}
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
  userDetails: {
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
