import "@/app/global.css";

import {
  DefaultTheme,
  ThemeProvider,
  type Theme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#EDEDED",
    card: "#ffffff",
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    extralight: require("@/assets/fonts/BricolageGrotesque-ExtraLight.ttf"),
    light: require("@/assets/fonts/BricolageGrotesque-Light.ttf"),
    regular: require("@/assets/fonts/BricolageGrotesque-Regular.ttf"),
    medium: require("@/assets/fonts/BricolageGrotesque-Medium.ttf"),
    semibold: require("@/assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    bold: require("@/assets/fonts/BricolageGrotesque-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!error && !loaded) return null;

  return (
    <ThemeProvider value={theme}>
      <SubRootLayout />
    </ThemeProvider>
  );
}

function SubRootLayout() {
  const isAuthenticated = false;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/create-account" />
      </Stack.Protected>
    </Stack>
  );
}
