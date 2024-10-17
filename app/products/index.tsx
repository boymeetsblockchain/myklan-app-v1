import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import tw from "twrnc";
import axios from "axios";
import { TextWrapper } from "../../components/textwrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeViewComponent } from "../../components/safeview";

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
};

type Sale = {
  id: number;
  delivery_status: string;
  created_at: string;
  product: Product;
  buyer: {
    name: string;
  };
};

export default function ProductPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "https://api.myklan.africa/public/api/my/sales",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSales(response.data.sales.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const renderItem = ({ item }: { item: Sale }) => (
    <View style={tw`p-4 bg-gray-100 mb-4 rounded-lg`}>
      <TextWrapper style={tw`text-lg font-bold mb-2`}>
        <Icon name="pricetag" size={20} /> {item.product.name}
      </TextWrapper>
      <TextWrapper style={tw`text-sm mb-1`}>
        <Icon name="cash" size={16} /> Price: ${item.product.price}
      </TextWrapper>
      <TextWrapper style={tw`text-sm mb-1`}>
        <Icon name="person" size={16} /> Buyer: {item.buyer.name}
      </TextWrapper>
      <TextWrapper style={tw`text-sm mb-1`}>
        <Icon name="checkmark-circle" size={16} /> Status:{" "}
        {item.delivery_status}
      </TextWrapper>
      <TextWrapper style={tw`text-sm text-gray-600`}>
        <Icon name="calendar" size={16} /> Date:{" "}
        {new Date(item.created_at).toLocaleDateString()}
      </TextWrapper>
    </View>
  );

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <TextWrapper style={tw`text-red-600 text-lg`}>{error}</TextWrapper>
      </View>
    );
  }

  return (
    <SafeViewComponent>
      <TextWrapper style={tw`text-center my-6 text-2xl`}>
        Current Sales
      </TextWrapper>
      <FlatList
        data={sales}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<TextWrapper>No sales found.</TextWrapper>}
        contentContainerStyle={tw`pb-4`}
      />
    </SafeViewComponent>
  );
}
