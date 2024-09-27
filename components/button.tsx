import { TouchableOpacity } from "react-native";
import { TextWrapperWhite } from "./textwrapper";
import tw from "twrnc";
import { useRouter } from "expo-router";

interface ButtonProps {
  text: string;
  href?: string;
  onPress?: () => void; // New onPress prop
}

export const Button = ({ text, href, onPress }: ButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(); // If onPress prop is passed, execute it
    } else if (href) {
      router.push(href); // Navigate to href if provided
    } else {
      console.log("Button pressed");
    }
  };

  return (
    <TouchableOpacity
      style={tw`py-2 px-3 rounded-2xl bg-black my-2`}
      onPress={handlePress}
    >
      <TextWrapperWhite style={tw`text-center`} fontWeight="bold" textSize="lg">
        {text}
      </TextWrapperWhite>
    </TouchableOpacity>
  );
};
