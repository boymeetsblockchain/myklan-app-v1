import { View, ActivityIndicator, Pressable, FlatList } from "react-native";
import { TextWrapper, TextWrapperWhite } from "../../../components/textwrapper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useGetUserProfile } from "../../../services/profile/queries";
import { Image } from "react-native";
import tw from "twrnc";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { ProfilePosts } from "../../../components/profile/ProfilePost";

export default function Dashboard() {
  const { data: profile, isLoading } = useGetUserProfile();

  // Convert date to a more readable format
  const formatDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 items-center justify-center `}>
        <ActivityIndicator color={"black"} size={"large"} />
      </View>
    );
  }

  return (
    <View style={tw`bg-white flex-1`}>
      <View>
        {/* Cover Image Section */}
        <View style={tw`relative`}>
          <Image
            source={{
              uri: `https://myklan.africa/public/uploads/cover/${profile?.user.cover}`,
            }}
            style={tw`w-full h-20`}
          />
          {/* Change Cover Image Button */}
          <Pressable
            style={tw`absolute bottom-0 left-0 flex-row gap-x-2 items-center bg-black py-2 px-3 rounded-full`}
          >
            <MaterialIcons name="camera-alt" size={20} color="white" />
          </Pressable>
        </View>

        {/* Profile Image and Details */}
        <View style={tw`px-4 -mt-12`}>
          <View style={tw`flex-col items-center relative`}>
            {/* Profile Image */}
            <View style={tw`relative`}>
              <Image
                source={{
                  uri: `https://myklan.africa/public/uploads/avatar/${profile?.user.avatar}`,
                }}
                style={tw`w-24 h-24 rounded-full border-4 border-black`}
              />
              {/* Edit Profile Image Button */}
              <Pressable
                style={tw`absolute bottom-0 right-8 bg-gray-800 p-1 rounded-full opacity-90`}
              >
                <MaterialIcons name="camera-alt" size={20} color="white" />
              </Pressable>
            </View>

            {/* Username and Verified Badge */}
            <View style={tw`flex-row items-center mt-2 gap-x-2`}>
              <TextWrapper style={tw`text-lg font-semibold`}>
                {profile?.user.username}
              </TextWrapper>
              <MaterialIcons name="verified" size={20} color="black" />
            </View>

            {/* Action Buttons: Edit Profile & Share */}
            <View style={tw`flex-row gap-x-4 mt-3`}>
              <Pressable style={tw`bg-black py-2 px-4 rounded-md`}>
                <Link href={"/editprofile"} asChild>
                  <TextWrapperWhite style={tw`text-sm font-medium`}>
                    Edit Profile
                  </TextWrapperWhite>
                </Link>
              </Pressable>
              <Pressable>
                <EvilIcons name="share-apple" size={28} color="black" />
              </Pressable>
            </View>
          </View>

          {/* User Details Section */}
          <View style={tw`my-4`}>
            <TextWrapper style={tw`text-lg font-semibold`}>
              About Me
            </TextWrapper>

            {/* Location */}
            <View style={tw`flex-row items-center gap-x-2 mt-2`}>
              <FontAwesome5 name="map-marker-alt" size={20} color="black" />
              <TextWrapper style={tw`text-base`}>Nigeria</TextWrapper>
            </View>

            {/* Member Since */}
            <View style={tw`flex-row items-center gap-x-2 mt-2`}>
              <FontAwesome5 name="calendar-alt" size={20} color="black" />

              {profile?.user.date && (
                <TextWrapper style={tw`text-base`}>
                  Member since {formatDate(profile?.user.date)}
                </TextWrapper>
              )}
            </View>

            {/* User Story */}
            <TextWrapper style={tw`text-base text-gray-700 mt-3`}>
              {profile?.user.story}
            </TextWrapper>
          </View>
        </View>
      </View>
      <View style={tw`flex-1`}>
        <FlatList
          data={profile?.updates.data}
          renderItem={({ item }) => (
            <ProfilePosts
              post={item}
              avatar={profile?.user.avatar as string}
              username={profile?.user.username as string}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={tw`h-6`} />}
        />
      </View>
    </View>
  );
}
