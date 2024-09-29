import { useState } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { TextWrapper } from "../../components/textwrapper";
import { SafeViewComponent } from "../../components/safeview";
import tw from "twrnc";
import { InputComp } from "../../components/input";
import { Button } from "../../components/button";
import { Link, router } from "expo-router";
import { Colors } from "../../utils/colors";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Hook for handling password reset
  const onSubmit = async () => {
    // Reset error message before starting submission
    setErrorMessage("");

    // Simple validation for empty email
    if (!email) {
      setErrorMessage("Email is required");
      return;
    }

    try {
      setIsLoading(true); // Start loading

      const response = await axios.post(
        "https://api.myklan.africa/public/api/password/email",
        {
          email,
        }
      );

      alert("Reset Email has been sent to your email");
      router.push("/"); // Redirect to login page after success
    } catch (error: any) {
      // Handle API errors (e.g., network issues or invalid email)
      setErrorMessage(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

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
            Forgot Password
          </TextWrapper>
          <TextWrapper
            style={{
              color: Colors.grey,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Enter your email address to receive a password reset link.
          </TextWrapper>

          {/* Display error message if any */}
          {errorMessage ? (
            <TextWrapper
              style={tw`text-center text-red-500 mb-2`}
              textSize="sm"
            >
              {errorMessage}
            </TextWrapper>
          ) : null}

          <View style={tw`gap-y-5`}>
            {/* Email Input */}
            <InputComp
              placeholder="Email"
              value={email}
              onChange={setEmail} // Updated to onChangeText for TextInput
              inputClass="shadow-md w-full"
              keyboardType="email-address" // To improve input UX for email
            />

            {/* Send Reset Link Button */}
            <Button text={"Send Reset Link"} onPress={onSubmit} />

            {/* Back to Sign In */}
            <View style={tw`items-center justify-center`}>
              <Link href={"/"}>
                <TextWrapper style={tw`text-center`} textSize="sm">
                  Back to Sign In
                </TextWrapper>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </SafeViewComponent>
  );
}
