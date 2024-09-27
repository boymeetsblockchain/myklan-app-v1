import { TextWrapper } from "../../components/textwrapper";
import { SafeViewComponent } from "../../components/safeview";
import tw from "twrnc";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Colors } from "../../utils/colors";
import { InputComp, PasswordInputComp } from "../../components/input";
import { Button } from "../../components/button";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useRegister } from "../../services/auth/queries";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Register() {
  const [checked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Hook for handling user registration
  const registerNewUser = useRegister();

  // Submit form data
  const onSubmit = () => {
    if (!email || !name || !password) {
      alert("Please fill in all Fields");
    }

    if (checked) {
      registerNewUser.mutate({
        email,
        name,
        password,
        agree: 1,
      });
    } else {
      alert("Please agree to the Terms and Conditions and Privacy Policy.");
    }
  };

  if (registerNewUser.isSuccess) {
    router.push("/");
  }
  if (registerNewUser.isError) {
    return (
      <SafeViewComponent>
        <View style={tw`items-center justify-center flex-1`}>
          <TextWrapper style={{ color: "red" }}>
            {registerNewUser.error?.response?.data?.message ||
              "Registration failed."}
          </TextWrapper>
        </View>
      </SafeViewComponent>
    );
  }

  return (
    <SafeViewComponent>
      <View style={tw`items-center justify-center flex-1`}>
        <View
          style={[
            tw`p-6 w-full rounded-lg shadow-lg gap-y-5`,
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
            Sign Up
          </TextWrapper>
          <TextWrapper
            style={{
              color: Colors.grey,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Join now! It takes only a few steps.
          </TextWrapper>
          <View style={tw`gap-y-5`}>
            {/* Full Name Input */}
            <InputComp
              placeholder="Full Name"
              value={name}
              onChange={setName}
              inputClass="shadow-md w-full"
            />

            {/* Email Input */}
            <InputComp
              placeholder="Email"
              value={email}
              onChange={setEmail}
              inputClass="shadow-md w-full"
            />

            {/* Password Input */}
            <PasswordInputComp
              placeholder="Password"
              value={password}
              onChange={setPassword}
              inputClass="shadow-md w-full"
            />

            {/* Checkbox for agreement */}
            <View style={tw`flex-row gap-x-2 items-center`}>
              {checked ? (
                <AntDesign
                  name="checksquare"
                  size={24}
                  color="black"
                  onPress={() => setIsChecked(false)} // Uncheck on click
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setIsChecked(true)} // Check on click
                  style={tw`h-4 w-4 border border-gray-300`}
                ></TouchableOpacity>
              )}

              <TextWrapper textSize="sm">
                I agree with the processing of personal data, Terms and
                Conditions, and Privacy Policy.
              </TextWrapper>
            </View>

            {/* Sign Up Button */}
            <Button
              text={registerNewUser.isPending ? "Registering ....." : "Sign Up"}
              onPress={onSubmit}
            />

            {/* Already have an account */}
            <View style={tw`items-center justify-center`}>
              <Link href={"/"}>
                <TextWrapper style={tw`text-center`} textSize="sm">
                  Already have an account?
                </TextWrapper>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </SafeViewComponent>
  );
}
