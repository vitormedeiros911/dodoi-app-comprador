import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";
import { Platform } from "react-native";

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return (
    <Ionicons
      size={Platform.OS === "ios" ? 22 : 26}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  );
}
