import { View, Text, Pressable } from "react-native";
import { SafeViewComponent } from "../../../../components/safeview";
import { TextWrapperWhite } from "../../../../components/textwrapper";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
export default function Search() {
  return (
    <SafeViewComponent>
      <View style={tw`bg-[#1DA1F2] p-4 rounded-lg mb-4 shadow-lg`}>
        <Link href={"/creators/new"} asChild>
          <Pressable style={tw`flex-row items-center justify-center`}>
            <MaterialIcons
              name="fiber-new"
              size={28}
              color="white"
              style={tw`mr-3`}
            />
            <TextWrapperWhite style={tw`text-lg font-semibold`}>
              New Creators
            </TextWrapperWhite>
          </Pressable>
        </Link>
      </View>

      {/* Free Creators Button */}
      <View style={tw`bg-[#17BF63] p-4 rounded-lg mb-4 shadow-lg`}>
        <Link href={"/creators/free"} asChild>
          <Pressable style={tw`flex-row items-center justify-center`}>
            <MaterialIcons
              name="attach-money"
              size={28}
              color="white"
              style={tw`mr-3`}
            />
            <TextWrapperWhite style={tw`text-lg font-semibold`}>
              Free Creators
            </TextWrapperWhite>
          </Pressable>
        </Link>
      </View>

      {/* Featured Creators Button */}
      <View style={tw`bg-[#FFAD1F] p-4 rounded-lg mb-4 shadow-lg`}>
        <Link href={"/creators/feature"} asChild>
          <Pressable style={tw`flex-row items-center justify-center`}>
            <MaterialIcons
              name="star"
              size={28}
              color="white"
              style={tw`mr-3`}
            />
            <TextWrapperWhite style={tw`text-lg font-semibold`}>
              Featured Creators
            </TextWrapperWhite>
          </Pressable>
        </Link>
      </View>

      {/* More Active Creators Button */}
      <View style={tw`bg-[#E0245E] p-4 rounded-lg shadow-lg`}>
        <Link href={"/creators/active"} asChild>
          <Pressable style={tw`flex-row items-center justify-center`}>
            <MaterialIcons
              name="trending-up"
              size={28}
              color="white"
              style={tw`mr-3`}
            />
            <TextWrapperWhite style={tw`text-lg font-semibold`}>
              More Active Creators
            </TextWrapperWhite>
          </Pressable>
        </Link>
      </View>
    </SafeViewComponent>
  );
}
