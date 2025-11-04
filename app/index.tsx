import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="h-full w-full bg-white">
      <Text className="text-green-600 font-bold text-3xl text-center">
        Edit app/index.tsx to edit this screen.{" "}
      </Text>
    </SafeAreaView>
  );
}
