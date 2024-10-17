import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextWrapper } from "../../components/textwrapper";
import tw from "twrnc";
import { Button } from "../../components/button";
import { Colors } from "../../utils/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddDigitalProduct() {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [boxcontent, setBoxcontent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null); // Only one image

  const handleImageUpload = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Set the single image for preview
        setPreviewImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      alert("Not Authorized");
      return;
    }

    if (
      !name ||
      !tags ||
      !description ||
      !price ||
      !quantity ||
      !boxcontent ||
      !shipping
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Create FormData object
      const formData = new FormData();

      // Append all form fields
      formData.append("name", name);
      formData.append("tags", tags);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("box_contents", boxcontent);
      formData.append("shipping_fee", shipping);
      formData.append("country_free_shipping", ""); // Add the appropriate country ID if needed

      // Convert the image URI to Blob and append it
      if (previewImage) {
        const response = await fetch(previewImage);
        const blob = await response.blob();
        const fileName = previewImage.split("/").pop();
        formData.append("fileuploader-list-preview", blob, fileName); // Append the Blob (single image)
      }

      // Make the POST request with the Authorization token and form data
      const response = await axios.post(
        "https://api.myklan.africa/public/api/add/physical/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle successful response
      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
    } catch (error: any) {
      console.log("Error adding product:", error);
      alert(
        "An error occurred: " +
          (error.response?.data?.message ||
            error.message ||
            "Something went wrong.")
      );
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-6 `}>
      <TextWrapper
        fontWeight="bold"
        textSize="2xl"
        style={tw`text-center mb-6`}
      >
        Add Physical Product
      </TextWrapper>

      {/* Preview Image Upload */}
      <View style={tw`mb-4`}>
        <TextWrapper style={tw`mb-2`}>Product Preview Image:</TextWrapper>
        <TouchableOpacity
          style={tw`border border-gray-300 rounded-lg p-4 items-center`}
          onPress={handleImageUpload}
        >
          <TextWrapper>Upload Image</TextWrapper>
          <AntDesign name="upload" size={20} color={Colors.black} />
        </TouchableOpacity>
        {previewImage && (
          <Image
            source={{ uri: previewImage }}
            style={tw`h-40 w-40 rounded-lg mt-4`}
          />
        )}
      </View>

      {/* Product Name */}
      <TextWrapper style={tw`mb-2`}>Product Name:</TextWrapper>
      <TextInput
        placeholder="Enter product name"
        value={name}
        onChangeText={setName}
        style={[
          tw`border border-gray-300 rounded-lg p-4 mb-4`,
          { fontFamily: "Poppins-Regular", fontSize: 16 },
        ]}
      />

      {/* Tags */}
      <TextWrapper style={tw`mb-2`}>Tags (comma-separated):</TextWrapper>
      <TextInput
        placeholder="Enter tags"
        value={tags}
        onChangeText={setTags}
        style={[
          tw`border border-gray-300 rounded-lg p-4 mb-4`,
          { fontFamily: "Poppins-Regular", fontSize: 16 },
        ]}
      />

      {/* Shipping Fee */}
      <TextWrapper style={tw`mb-2`}>Shipping Fee:</TextWrapper>
      <TextInput
        placeholder="Enter Shipping Fee"
        value={shipping}
        onChangeText={setShipping}
        style={[
          tw`border border-gray-300 rounded-lg p-4 mb-4`,
          { fontFamily: "Poppins-Regular", fontSize: 16 },
        ]}
      />

      {/* Box Content */}
      <TextWrapper style={tw`mb-2`}>Box Content:</TextWrapper>
      <TextInput
        placeholder="Enter Box Content"
        value={boxcontent}
        onChangeText={setBoxcontent}
        style={[
          tw`border border-gray-300 rounded-lg p-4 mb-4`,
          { fontFamily: "Poppins-Regular", fontSize: 16 },
        ]}
      />

      {/* Quantity */}
      <TextWrapper style={tw`mb-2`}>Quantity:</TextWrapper>
      <TextInput
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={setQuantity}
        style={[
          tw`border border-gray-300 rounded-lg p-4 mb-4`,
          { fontFamily: "Poppins-Regular", fontSize: 16 },
        ]}
      />

      {/* Description */}
      <TextWrapper style={tw`mb-2`}>Description:</TextWrapper>
      <TextInput
        placeholder="Enter product description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[
          tw`border border-gray-300 rounded-lg p-4 mb-4 h-24`,
          { fontFamily: "Poppins-Regular", fontSize: 16 },
        ]}
      />

      {/* Price */}
      <TextWrapper style={tw`mb-2`}>Price:</TextWrapper>
      <TextInput
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={[
          tw`border border-gray-300 rounded-lg p-4 mb-4`,
          { fontFamily: "Poppins-Regular", fontSize: 16 },
        ]}
      />

      {/* Submit Button */}
      <Button text="Add Product" onPress={handleSubmit} />
    </ScrollView>
  );
}
