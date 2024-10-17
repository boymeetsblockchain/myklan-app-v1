import { TextWrapper } from "./textwrapper";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import tw from "twrnc";

interface InputCompProps {
  label?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: KeyboardTypeOptions;
  inputClass?: string;
  labelClass?: string;
  value: string;
  onChange: (text: string) => void;
}

export const InputComp: React.FC<InputCompProps> = ({
  label,
  placeholder,
  placeholderTextColor = "#5f5f5f",
  keyboardType,
  inputClass = "",
  labelClass,
  value,
  onChange,
}) => {
  return (
    <View style={tw`mb-0`}>
      {label && (
        <TextWrapper
          style={tw`text-white py-2.5 text-base capitalize ${labelClass ?? ""}`}
        >
          {label}
        </TextWrapper>
      )}
      <TextInput
        style={[
          {
            fontFamily: "Poppins-Regular",
            fontSize: 16,
          },
          tw`bg-white h-12 rounded-xl px-4`, // Updated height
          inputClass ? tw`${inputClass}` : {},
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export const PasswordInputComp: React.FC<
  Omit<InputCompProps, "keyboardType">
> = ({
  label,
  placeholder,
  placeholderTextColor = "#5f5f5f",
  inputClass = "",
  value,
  onChange,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <View style={tw`mb-0`}>
      {label && (
        <TextWrapper style={tw`text-white text-base py-2.5 capitalize`}>
          {label}
        </TextWrapper>
      )}
      <View style={tw`relative`}>
        <TextInput
          style={[
            {
              fontFamily: "Poppins-Regular",
              fontSize: 16,
            },
            tw`bg-white h-12 rounded-xl px-4`, // Updated height
            inputClass ? tw`${inputClass}` : {},
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={!showPass}
          value={value}
          onChangeText={onChange}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPass(!showPass)}
        >
          {showPass ? (
            <Ionicons name="eye-off-outline" size={24} color="black" />
          ) : (
            <Ionicons name="eye-outline" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }], // Adjust for better centering
    zIndex: 10,
  },
});
