import { Platform } from "react-native";
import { useReducedMotion } from "react-native-reanimated";

export const configureReanimated = () => {
  if (Platform.OS === "ios") {
    const isReducedMotion = useReducedMotion();
    // You can add custom logic here to handle reduced motion
    console.log("Reduced motion is:", isReducedMotion ? "enabled" : "disabled");
  }
};
