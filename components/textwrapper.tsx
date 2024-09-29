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

// TextWrapper with React.forwardRef
export const TextWrapper = React.forwardRef<Text, TextWrapperComponentProps>(
  (
    { children, fontWeight = "regular", textSize = "base", style, ...props },
    ref
  ) => {
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
        ref={ref} // forward the ref
        style={[
          { fontFamily: getFontFamily(), fontSize: getFontSize() },
          style,
        ]} // Use preset sizes
        {...props}
      >
        {children}
      </Text>
    );
  }
);

// For better debugging
TextWrapper.displayName = "TextWrapper";

// TextWrapperWhite with React.forwardRef
export const TextWrapperWhite = React.forwardRef<
  Text,
  TextWrapperComponentProps
>(
  (
    { children, fontWeight = "regular", textSize = "base", style, ...props },
    ref
  ) => {
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
        ref={ref} // forward the ref
        style={[
          {
            fontFamily: getFontFamily(),
            color: "#fff",
            fontSize: getFontSize(),
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

// For better debugging
TextWrapperWhite.displayName = "TextWrapperWhite";
