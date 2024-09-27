import { useNavigation } from "expo-router";
import { Image, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useGetUser } from "../services/user/queries";
import tw from "twrnc";

export const CustomHeader = () => {
  const { data } = useGetUser();

  const navigation = useNavigation();
  return (
    <View
      style={tw`w-full h-20 bg-white flex flex-row items-center justify-between px-4`}
    >
      <Pressable onPress={() => navigation.openDrawer()}>
        <Image
          source={{
            uri: `https://myklan.africa/public/uploads/avatar/${data?.avatar}`,
          }}
          style={{ width: 30, aspectRatio: 1, borderRadius: 40 }}
        />
      </Pressable>
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={tw`h-20 w-20`}
      />
      <Pressable>
        <Link href={"/setting"}>
          <FontAwesome name="gear" color={"#ffffff"} size={24} />
        </Link>
      </Pressable>
    </View>
  );
};
