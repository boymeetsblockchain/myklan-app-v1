import { TextWrapper } from "../components/textwrapper";
import tw from "twrnc";
import { TouchableOpacity, View } from "react-native";
import { SafeViewComponent } from "../components/safeview";
import { Colors } from "../utils/colors";
import { InputComp, PasswordInputComp } from "../components/input";
import { Button } from "../components/button";
import { Link } from "expo-router";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLogin } from "../services/auth/queries";

export default function Home() {
  const loginNewUser = useLogin();
  const [checked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    if (!email || !password) {
      alert("Please fill in all Fields");
      return;
    }

    console.log(email);
    loginNewUser.mutate({
      email,
      password,
    });
  };

  return (
    <SafeViewComponent>
      <View style={tw`items-center justify-center flex-1 bg-white`}>
        <View
          style={[
            tw`p-8 w-full rounded-lg shadow-lg gap-y-6`,
            {
              backgroundColor: Colors.white,
              borderColor: Colors.grey,
              borderWidth: 1,
            },
          ]}
        >
          <TextWrapper
            fontWeight="bold"
            textSize="2xl"
            style={{
              color: Colors.black,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Welcome Back
          </TextWrapper>
          <TextWrapper
            textSize="md"
            style={{
              color: Colors.grey,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            We're happy to see you again!
          </TextWrapper>
          <View style={tw`gap-y-6`}>
            <InputComp
              placeholder="Email"
              value={email}
              onChange={setEmail}
              inputClass="shadow-lg w-full border-gray-300 rounded-lg"
            />

            <PasswordInputComp
              placeholder="Password"
              value={password}
              onChange={setPassword}
              inputClass="shadow-lg w-full border-gray-300 rounded-lg"
            />

            <View style={tw`flex-row gap-x-3 items-center`}>
              {checked ? (
                <AntDesign
                  name="checksquare"
                  size={24}
                  color={Colors.black}
                  onPress={() => setIsChecked(false)}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setIsChecked(true)}
                  style={tw`h-6 w-6 border border-gray-400 rounded-lg flex items-center justify-center`}
                >
                  <AntDesign name="plus" size={12} color={Colors.grey} />
                </TouchableOpacity>
              )}

              <TextWrapper textSize="sm" style={{ color: Colors.black }}>
                Remember me
              </TextWrapper>
            </View>

            <Button
              text={loginNewUser.isPending ? "Logging in..." : "Login"}
              onPress={onSubmit}
            />

            <View style={tw`my-4 justify-between flex-row items-center`}>
              <Link href={"/auth/password"}>
                <TextWrapper textSize="sm" style={{ color: Colors.black }}>
                  Forgot Password?
                </TextWrapper>
              </Link>
              <Link href={"/auth/register"}>
                <TextWrapper textSize="sm" style={{ color: Colors.black }}>
                  Don't have an Account?
                </TextWrapper>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </SafeViewComponent>
  );
}
