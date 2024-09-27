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
    }

    console.log(email);
    loginNewUser.mutate({
      email,
      password,
    });
  };

  return (
    <SafeViewComponent>
      <View style={tw`items-center justify-center  flex-1 `}>
        <View
          style={[
            tw`p-6 w-full rounded-lg shadow-lg gap-y-3`,
            { backgroundColor: Colors.white },
          ]}
        >
          <TextWrapper
            fontWeight="bold"
            textSize="lg"
            style={{
              color: Colors.grey,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Welcome Back
          </TextWrapper>
          <TextWrapper
            style={{
              color: Colors.grey,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Happy to See you Again!
          </TextWrapper>
          <View style={tw`gap-y-5`}>
            <InputComp
              placeholder="Email"
              value={email}
              onChange={setEmail}
              inputClass="shadow-md w-full"
            />

            <PasswordInputComp
              placeholder="Password"
              value={password}
              onChange={setPassword}
              inputClass="shadow-md w-full"
            />
            <View style={tw`flex-row gap-x-2 items-center`}>
              {checked ? (
                <AntDesign
                  name="checksquare"
                  size={24}
                  color="black"
                  onPress={() => {
                    setIsChecked(true);
                  }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIsChecked(true);
                  }}
                  style={tw`h-4 w-4 border border-gray-300 `}
                ></TouchableOpacity>
              )}

              <TextWrapper textSize="sm">Remember me</TextWrapper>
            </View>
            <Button
              text={loginNewUser.isPending ? "Logining..." : "Login"}
              onPress={onSubmit}
            />
            <View style={tw`my-3 justify-between flex-row   items-center`}>
              <Link href={"/password"}>
                <TextWrapper textSize="sm">Forgot Password ?</TextWrapper>
              </Link>
              <Link href={"/auth/register"}>
                <TextWrapper textSize="sm">Dont have an Account?</TextWrapper>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </SafeViewComponent>
  );
}
