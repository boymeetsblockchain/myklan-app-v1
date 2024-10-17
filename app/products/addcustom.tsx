import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { TextWrapper } from "../../components/textwrapper";
import { SafeViewComponent } from "../../components/safeview";
import tw from "twrnc";
import { Button } from "../../components/button";
import { Colors } from "../../utils/colors";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AddDigitalProduct() {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("2"); // Default category = 2
  const [previewImages, setPreviewImages] = useState([]);
  const [productFile, setProductFile] = useState(null);

  const handleImageUpload = () => {
    // Function to handle image upload (to be implemented)
  };

  const handleFileUpload = () => {
    // Function to handle file upload (to be implemented)
  };

  const handleSubmit = () => {
    // Validate inputs and submit the form
    if (!name || !tags || !description || !price || !productFile) {
      alert("Please fill in all fields.");
      return;
    }

    // Submit form data to the API (to be implemented)
  };

  return (
    <SafeViewComponent>
      <ScrollView contentContainerStyle={tw`flex-1 bg-white p-6`}>
        <TextWrapper
          fontWeight="bold"
          textSize="2xl"
          style={tw`text-center mb-6`}
        >
          Add Custom
        </TextWrapper>

        {/* Preview Image Upload */}
        <View style={tw`mb-4`}>
          <TextWrapper style={tw`mb-2`}>Product Preview Images:</TextWrapper>
          <TouchableOpacity
            style={tw`border border-gray-300 rounded-lg p-4 items-center`}
            onPress={handleImageUpload}
          >
            <TextWrapper>Upload Images (max 2)</TextWrapper>
            <AntDesign name="upload" size={20} color={Colors.black} />
          </TouchableOpacity>
          {previewImages.length > 0 && (
            <View style={tw`flex-row mt-2`}>
              {previewImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={tw`h-20 w-20 rounded-lg mr-2`}
                />
              ))}
            </View>
          )}
        </View>

        {/* Digital Product File Upload */}
        <View style={tw`mb-4`}>
          <TextWrapper style={tw`mb-2`}>Digital Product File:</TextWrapper>
          <TouchableOpacity
            style={tw`border border-gray-300 rounded-lg p-4 items-center`}
            onPress={handleFileUpload}
          >
            <TextWrapper>Upload Digital File</TextWrapper>
            <AntDesign name="upload" size={20} color={Colors.black} />
          </TouchableOpacity>
          {productFile && (
            <TextWrapper style={tw`mt-2`}>File: {productFile.name}</TextWrapper>
          )}
        </View>

        {/* Product Name */}
        <TextWrapper style={tw`mb-2`}>Product Name:</TextWrapper>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-4 mb-4`}
          placeholder="Enter product name"
          value={name}
          onChangeText={setName}
        />

        {/* Tags */}
        <TextWrapper style={tw`mb-2`}>Tags (comma-separated):</TextWrapper>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-4 mb-4`}
          placeholder="Enter tags"
          value={tags}
          onChangeText={setTags}
        />

        {/* Description */}
        <TextWrapper style={tw`mb-2`}>Description:</TextWrapper>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-4 mb-4 h-24`}
          placeholder="Enter product description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Price */}
        <TextWrapper style={tw`mb-2`}>Price:</TextWrapper>
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-4 mb-4`}
          placeholder="Enter price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Category Selection */}
        <TextWrapper style={tw`mb-2`}>Category:</TextWrapper>
        {/* <View style={tw`border border-gray-300 rounded-lg mb-4`}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={tw`p-4`}
          >
            <Picker.Item label="Digital Product" value="2" />
            <Picker.Item label="Physical Product" value="1" />
            <Picker.Item label="Custom Product" value="3" />
          </Picker>
        </View> */}

        {/* Submit Button */}
        <Button text="Add Product" onPress={handleSubmit} />
      </ScrollView>
    </SafeViewComponent>
  );
}
