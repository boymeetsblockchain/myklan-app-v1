import { TextWrapper } from "../../components/textwrapper";
import { SafeViewComponent } from "../../components/safeview";
import tw from "twrnc";
import { View, TouchableOpacity } from "react-native";
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
      return;
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
            Sign Up
          </TextWrapper>
          <TextWrapper
            textSize="md"
            style={{
              color: Colors.grey,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Join now! It takes only a few steps.
          </TextWrapper>
          <View style={tw`gap-y-6`}>
            {/* Full Name Input */}
            <InputComp
              placeholder="Full Name"
              value={name}
              onChange={setName}
              inputClass="shadow-lg w-full border-gray-300 rounded-lg"
            />

            {/* Email Input */}
            <InputComp
              placeholder="Email"
              value={email}
              onChange={setEmail}
              inputClass="shadow-lg w-full border-gray-300 rounded-lg"
            />

            {/* Password Input */}
            <PasswordInputComp
              placeholder="Password"
              value={password}
              onChange={setPassword}
              inputClass="shadow-lg w-full border-gray-300 rounded-lg"
            />

            {/* Checkbox for agreement */}
            <View style={tw`flex-row gap-x-3 items-center`}>
              {checked ? (
                <AntDesign
                  name="checksquare"
                  size={24}
                  color={Colors.black}
                  onPress={() => setIsChecked(false)} // Uncheck on click
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setIsChecked(true)} // Check on click
                  style={tw`h-6 w-6 border border-gray-400 rounded-lg flex items-center justify-center`}
                >
                  <AntDesign name="plus" size={12} color={Colors.grey} />
                </TouchableOpacity>
              )}

              <TextWrapper textSize="sm" style={{ color: Colors.black }}>
                I agree with the processing of personal data, Terms and
                Conditions, and Privacy Policy.
              </TextWrapper>
            </View>

            {/* Sign Up Button */}
            <Button
              text={registerNewUser.isPending ? "Registering..." : "Sign Up"}
              onPress={onSubmit}
            />

            {/* Already have an account */}
            <View style={tw`items-center justify-center mt-4`}>
              <Link href={"/"}>
                <TextWrapper
                  textSize="sm"
                  style={{ color: Colors.black, textAlign: "center" }}
                >
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
