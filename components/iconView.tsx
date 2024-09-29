import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from "expo-blur";
import tw from "twrnc";
import { router } from "expo-router";

const IconMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the visibility of the icons
  const toggleMenu = () => {
    setIsExpanded((prev) => !prev);
  };

  // Event handlers for each icon button
  const handleCameraPress = () => {
    console.log("Camera icon clicked");
  };

  const handleImagePress = () => {
    console.log("Image icon clicked");
  };

  const handleFilePress = () => {
    console.log("File icon clicked");
  };

  const handleVideoPress = () => {
    console.log("Video icon clicked");
  };

  return (
    <View style={tw`flex-1`}>
      {isExpanded && (
        <BlurView
          intensity={100}
          tint="dark"
          style={tw`absolute flex-1 inset-0 z-20`}
        />
      )}

      {/* Plus button */}
      <TouchableOpacity
        style={tw`bg-black p-4 rounded-full absolute bottom-4 right-2 z-20`}
        onPress={toggleMenu}
      >
        <AntDesign
          name={isExpanded ? "close" : "plus"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={tw`absolute bottom-24 right-2 z-20`}>
          {/* Icon Menu List */}
          <View style={tw`flex items-center`}>
            {/* Icon 1 - Camera */}
            <TouchableOpacity
              style={tw`bg-red-500 p-4 rounded-full mb-2`}
              onPress={handleCameraPress}
            >
              <Icon name="camera" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Icon 2 - Image */}
            <TouchableOpacity
              style={tw`bg-green-500 p-4 rounded-full mb-2`}
              onPress={() => router.push("/post/image")}
            >
              <Icon name="image" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Icon 3 - File */}
            <TouchableOpacity
              style={tw`bg-yellow-500 p-4 rounded-full mb-2`}
              onPress={() => router.push("/post/zip")}
            >
              <Icon name="file" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Icon 4 - Video */}
            <TouchableOpacity
              style={tw`bg-purple-500 p-4 rounded-full mb-2`}
              onPress={handleVideoPress}
            >
              <Icon name="video-camera" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-blue-300 p-4 rounded-full mb-2`}
              onPress={() => router.push("/post")}
            >
              <Icon name="pencil" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default IconMenu;
