import GoogleIcon from "@/assets/icons/google.png";
import { login, useAuthStore } from "@/lib/appwrite";
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

const SignIn = () => {
  const [isHiden, setHiden] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const setUserAndLoggedIn = useAuthStore((state) => state.setUserAndLoggedIn);

  const handleSignin = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        ToastAndroid.show("Please input required details", ToastAndroid.SHORT);
        return;
      }

      const error = await login(email, password, setUserAndLoggedIn);

      if (error) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
        return;
      }
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
            <Text className="text-5xl  font-regular ">Log In</Text>

            <Link
              push
              href={"/(auth)/create-account"}
              className="flex flex-row gap-0.5 items-center"
            >
              <Text className="text-lg font-medium text-orange-500">
                Sign Up
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

            <Link push href={"/"} className="flex self-end">
              <Text className="text-lg font-regular text-orange-500">
                Forgot Password?
              </Text>
            </Link>

            <Pressable
              className=" overflow-hidden rounded-lg"
              onPress={handleSignin}
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
                    "Log In"
                  )}
                </Text>
              </LinearGradient>
            </Pressable>

            <View className="mt-12 flex flex-col gap-5">
              <Text className="text-lg font-medium text-gray-700 text-center">
                Or Log in with:
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

export default SignIn;
