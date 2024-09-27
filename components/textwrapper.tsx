import React from "react";
import { Text, TextProps } from "react-native";

interface TextWrapperComponentProps extends TextProps {
  children: React.ReactNode;
  fontWeight?: "regular" | "bold" | "extraBold";
  textSize?: "sm" | "md" | "base" | "lg" | "2xl"; // Preset size options
}

// Define size presets
const sizePresets = {
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  "2xl": 24,
};

export const TextWrapper = ({
  children,
  fontWeight = "regular",
  textSize = "base",
  style,
  ...props
}: TextWrapperComponentProps) => {
  const getFontFamily = () => {
    switch (fontWeight) {
      case "bold":
        return "Poppins-Bold";
      case "extraBold":
        return "Poppins-ExtraBold";
      default:
        return "Poppins-Regular";
    }
  };

  const getFontSize = () => {
    return sizePresets[textSize] || sizePresets.base;
  };

  return (
    <Text
      style={[{ fontFamily: getFontFamily(), fontSize: getFontSize() }, style]} // Use preset sizes
      {...props}
    >
      {children}
    </Text>
  );
};

export const TextWrapperWhite = ({
  children,
  fontWeight = "regular",
  textSize = "base",
  style,
  ...props
}: TextWrapperComponentProps) => {
  const getFontFamily = () => {
    switch (fontWeight) {
      case "bold":
        return "Poppins-Bold";
      case "extraBold":
        return "Poppins-ExtraBold";
      default:
        return "Poppins-Regular";
    }
  };
  const getFontSize = () => {
    return sizePresets[textSize] || sizePresets.base;
  };

  return (
    <Text
      style={[
        { fontFamily: getFontFamily(), color: "#fff", fontSize: getFontSize() },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
