import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useGetUser } from "../services/user/queries";
import { Image, View } from "react-native";
import { TextWrapper, TextWrapperWhite } from "./textwrapper";
import tw from "twrnc";

export const CustomDrawerContent = (props: any) => {
  const { data, isLoading } = useGetUser();

  return (
    <DrawerContentScrollView {...props}>
      <View style={tw`flex items-center flex-col bg-white py-4`}>
        <Image
          source={{
            uri: `https://myklan.africa/public/uploads/avatar/${data?.avatar}`,
          }}
          style={{ width: 60, aspectRatio: 1, borderRadius: 40 }}
        />
        {data ? (
          <TextWrapper fontWeight="bold" textSize="base">
            @{data.username}
          </TextWrapper>
        ) : (
          <TextWrapper fontWeight="bold" textSize="base">
            No Data to render
          </TextWrapper>
        )}
        <View style={tw`flex flex-row justify-between gap-x-6 mt-2`}></View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
