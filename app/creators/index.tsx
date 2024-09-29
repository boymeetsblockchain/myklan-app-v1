import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function VerifyAccount() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageReverseUri, setImageReverseUri] = useState<string | null>(null);
  const [imageSelfieUri, setImageSelfieUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const formData = new FormData();
      formData.append("address", address);
      formData.append("city", city);

      if (imageUri) {
        formData.append("image", {
          uri: imageUri,
          type: "image/jpeg",
          name: "image.jpg",
        } as any);
      }

      if (imageReverseUri) {
        formData.append("image_reverse", {
          uri: imageReverseUri,
          type: "image/jpeg",
          name: "image_reverse.jpg",
        } as any);
      }

      if (imageSelfieUri) {
        formData.append("image_selfie", {
          uri: imageSelfieUri,
          type: "image/jpeg",
          name: "image_selfie.jpg",
        } as any);
      }

      await axios.post(
        "https://api.myklan.africa/public/api/settings/verify/account",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(
        "Success",
        "Your account verification request has been submitted.",
        [{ text: "OK", onPress: () => console.log("Verification submitted") }]
      );

      // Reset form
      setAddress("");
      setCity("");
      setImageUri(null);
      setImageReverseUri(null);
      setImageSelfieUri(null);
    } catch (err: any) {
      if (err.response && err.response.status === 422) {
        // Log validation errors from the server
        console.log("Validation errors:", err.response.data);
        setError(
          "Validation error: " + JSON.stringify(err.response.data.errors)
        );
      } else {
        console.log(err);
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const selectImage = async (
    setImageCallback: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImageCallback(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-black p-6`}>
      <Text style={tw`text-2xl font-bold text-white mb-4`}>
        Verify Your Account
      </Text>

      <TextInput
        style={tw`bg-transparent border border-white text-white p-3 mb-4 rounded-md`}
        placeholder="Address"
        placeholderTextColor={"white"}
        value={address}
        onChangeText={setAddress}
        editable={!loading}
      />

      <TextInput
        style={tw`bg-transparent border border-white text-white p-3 mb-4 rounded-md`}
        placeholder="City"
        placeholderTextColor={"white"}
        value={city}
        onChangeText={setCity}
        editable={!loading}
      />

      <View style={tw`mb-4`}>
        <Pressable
          style={tw`p-3 bg-gray-800 rounded-md mb-4`}
          onPress={() => selectImage(setImageUri)}
          disabled={loading}
        >
          <Text style={tw`text-gray-300`}>Select Front Image</Text>
        </Pressable>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={tw`w-full h-40 rounded-md`}
          />
        )}
      </View>

      <View style={tw`mb-4`}>
        <Pressable
          style={tw`p-3 bg-gray-800 rounded-md mb-4`}
          onPress={() => selectImage(setImageReverseUri)}
          disabled={loading}
        >
          <Text style={tw`text-gray-300`}>Select Reverse Image</Text>
        </Pressable>
        {imageReverseUri && (
          <Image
            source={{ uri: imageReverseUri }}
            style={tw`w-full h-40 rounded-md`}
          />
        )}
      </View>

      <View style={tw`mb-4`}>
        <Pressable
          style={tw`p-3 bg-gray-800 rounded-md mb-4`}
          onPress={() => selectImage(setImageSelfieUri)}
          disabled={loading}
        >
          <Text style={tw`text-gray-300`}>Select Selfie Image</Text>
        </Pressable>
        {imageSelfieUri && (
          <Image
            source={{ uri: imageSelfieUri }}
            style={tw`w-full h-40 rounded-md`}
          />
        )}
      </View>

      {error ? <Text style={tw`text-red-500 mb-4`}>{error}</Text> : null}

      <Pressable
        style={[
          tw`p-4 rounded-md items-center justify-center mb-6`,
          loading ? tw`bg-gray-600` : tw`bg-[#ffde59]`,
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Text style={tw`text-black font-bold`}>Submit Verification</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}
