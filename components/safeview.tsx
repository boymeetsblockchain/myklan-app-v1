import { SafeAreaView } from "react-native";
import tw from "twrnc";

interface SafeViewComponentProps {
  children: React.ReactNode;
}
export const SafeViewComponent = ({ children }: SafeViewComponentProps) => {
  return (
    <SafeAreaView style={tw`flex-1 p-6 bg-white `}>{children}</SafeAreaView>
  );
};
