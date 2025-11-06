import { logoutCurrentDevice, useAuthStore } from "@/lib/appwrite";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/shallow";
export default function Index() {
  const { user, logout } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    }))
  );

  return (
    <SafeAreaView className="h-full w-full  bg-white p-4">
      <StatusBar style="dark" />

      <Pressable
        className="rounded-lg overflow-hidden"
        onPress={() => logoutCurrentDevice(logout)}
      >
        <LinearGradient
          colors={["#FFA450", "#FF5C00"]}
          className="w-full "
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text className="text-xl font-semibold text-center p-3"> Logout</Text>
        </LinearGradient>
      </Pressable>
    </SafeAreaView>
  );
}
