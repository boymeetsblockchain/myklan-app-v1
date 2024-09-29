import { withLayoutContext } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomHeader } from "../../../components/customHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { CustomDrawerContent } from "../../../components/customHeaderDrawer";

const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
  initialRouteName: "dashboard",
};

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#000", // Black for active item
        drawerInactiveTintColor: "#000", // Black for inactive items
        drawerStyle: { backgroundColor: "#fff" }, // White background
        headerShown: true,
        header: () => <CustomHeader />, // Custom header component
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Feed",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="home-outline" color={color} size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="grid-outline" color={color} size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="person-outline" color={color} size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="bookmark-outline" color={color} size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="wallet"
        options={{
          title: "Wallet",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="wallet-outline" color={color} size={24} />
          ),
        }}
      />

      <Drawer.Screen
        name="subscribers"
        options={{
          title: "My Subscribers",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="people-outline" color={color} size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="subscription"
        options={{
          title: "My Subscriptions",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Icon name="list-outline" color={color} size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="setting"
        options={{
          title: "Settings",
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="gear" color={color} size={24} />
          ),
        }}
      />
    </Drawer>
  );
}
