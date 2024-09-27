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
  onChange: (text: string) => void; // onChange function prop
}

// InputComp functional component
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
          tw`bg-white h-11.5 rounded-xl px-4`,
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
            tw`bg-white h-11.5 rounded-xl px-4`,
            inputClass ? tw`${inputClass}` : {},
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={!showPass}
          value={value}
          onChangeText={onChange} // Handle the onChange prop
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPass(!showPass)}
        >
          <TextWrapper style={tw`text-gray-500`}>
            {showPass ? (
              <Ionicons name="eye-off-outline" size={24} color="black" />
            ) : (
              <Ionicons name="eye-outline" size={24} color="black" />
            )}
          </TextWrapper>
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
    transform: [{ translateY: -10 }],
    zIndex: 10,
  },
});
