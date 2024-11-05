import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  isLoading?: boolean;
  loadingColor?: string;
};

export default function Button({
  children,
  style,
  isLoading = false,
  loadingColor,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[{ justifyContent: "center" }, style]}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={loadingColor ? loadingColor : "#fff"} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
