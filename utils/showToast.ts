import Toast from "react-native-root-toast";
import { Dimensions } from "react-native";

export function showToast(
  message: string,
  type: "success" | "error" | "info" = "info"
) {
  let backgroundColor = "#2196F3";

  if (type === "success") backgroundColor = "#4CAF50";
  if (type === "error") backgroundColor = "#f44336";
  if (type === "info") backgroundColor = "#2196F3";

  const { height } = Dimensions.get("window");

  const topPosition = height * 0.1;

  if (!message) {
    message = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    type = "error";
  }

  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    backgroundColor,
    textColor: "#fff",
    animation: true,
    hideOnPress: true,
    delay: 0,
    containerStyle: {
      top: topPosition,
    },
  });
}
