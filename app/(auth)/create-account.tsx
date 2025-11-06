import GoogleIcon from "@/assets/icons/google.png";
import { register, useAuthStore } from "@/lib/appwrite";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//At least one lowercase letter
// At least one uppercase letter
// At least one digit
// Minimum 8 characters

const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(.)\1{2,}).{8,}$/;

const CreateAccount = () => {
  const [isHiden, setHiden] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const setUserAndLoggedIn = useAuthStore((state) => state.setUserAndLoggedIn);

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      if (!email || !password || !name) {
        ToastAndroid.show(
          "Please provide all required details",
          ToastAndroid.SHORT
        );
        return;
      }

      const passed = PasswordRegex.test(password);
      if (!passed) {
        ToastAndroid.show(
          "Password have atleast 8 chracters with one Lowercase, one Uppercase, one digit",
          ToastAndroid.SHORT
        );

        return;
      }

      if (password !== confirmPassword) {
        ToastAndroid.show(
          "Password and Confirm-password mismatch",
          ToastAndroid.SHORT
        );

        return;
      }

      const error = await register(name, email, password, setUserAndLoggedIn);

      if (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
        return;
      }

      // router.replace("/(tabs)");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 w-full h-full p-8">
      <StatusBar style="inverted" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView keyboardShouldPersistTaps="handled" className="mt-4">
          {/* title section  */}
          <View className=" flex flex-row justify-between items-center">
            <Text className="text-5xl  font-regular ">Sign Up</Text>

            <Link
              push
              href={"/(auth)/sign-in"}
              className="flex flex-row gap-0.5 items-center"
            >
              <Text className="text-lg font-medium text-orange-500">
                Log In
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={"#f97316"}
              />
            </Link>
          </View>

          {/* form section  */}
          <View className="mt-12 flex flex-col gap-6">
            <View className=" flex flex-col gap-1">
              <Text className="text-lg font-regular">Name</Text>
              <TextInput
                className="bg-white p-3 rounded-md  shadow-sm text-lg font-regular"
                placeholder="john doe"
                autoCapitalize="none"
                onChangeText={setName}
              />
            </View>
            <View className=" flex flex-col gap-1">
              <Text className="text-lg font-regular">Email</Text>
              <TextInput
                className="bg-white p-3 rounded-md  shadow-sm text-lg font-regular"
                placeholder="example@gmail.com"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
              />
            </View>
            <View className=" flex flex-col gap-1">
              <Text className="text-lg font-regular">Password</Text>
              <View className="relative">
                <TextInput
                  secureTextEntry={isHiden}
                  className="bg-white p-3 rounded-md  shadow-sm text-lg font-regular"
                  placeholder="example@gmail.com"
                  textContentType="newPassword"
                  passwordRules={
                    "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
                  }
                  onChangeText={setPassword}
                />
                <Pressable
                  className="absolute top-3.5 right-6"
                  onPress={() => setHiden(!isHiden)}
                >
                  <Ionicons
                    name={isHiden ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color={"gray"}
                  />
                </Pressable>
              </View>
            </View>

            <View className=" flex flex-col gap-1">
              <Text className="text-lg font-regular">
                Password Confirmation
              </Text>
              <View className="relative">
                <TextInput
                  className="bg-white p-3 rounded-md  shadow-sm text-lg font-regular"
                  placeholder="example@gmail.com"
                  // passwordRules={
                  //   "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
                  // }
                  keyboardType="visible-password"
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>

            <Pressable
              className=" overflow-hidden rounded-lg mt-4"
              onPress={handleCreateAccount}
            >
              <LinearGradient
                colors={["#FFA450", "#FF5C00"]}
                className="w-full"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text className="text-xl text-white font-semibold text-center p-3">
                  {isLoading ? (
                    <Ionicons
                      name="ellipse-outline"
                      size={26}
                      color={"white"}
                    />
                  ) : (
                    "Create Account"
                  )}
                </Text>
              </LinearGradient>
            </Pressable>

            <View className="mt-12 flex flex-col gap-5">
              <Text className="text-lg font-medium text-gray-700 text-center">
                Or Register with:
              </Text>
              <Pressable className="bg-white rounded-lg p-4 flex flex-row items-center justify-center gap-3">
                <Image
                  source={GoogleIcon}
                  alt=""
                  style={{ height: 24, width: 24 }}
                  contentFit="cover"
                />
                <Text className="text-lg font-medium">Cotinue with Google</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccount;
