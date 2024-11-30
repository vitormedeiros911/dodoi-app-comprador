import { TouchableOpacity } from "react-native";

import ImageWithFallback from "../ImageWithFallback";
import { ThemedText } from "../ThemedText";
import { styles } from "./styles";

type CardSecondaryProps = {
  imageUrl?: string;
  title: string;
  imageSource?: any;
  onPress?: () => void;
};

export default function CardSecondary({
  imageUrl,
  imageSource,
  title,
  onPress,
}: CardSecondaryProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageWithFallback
        style={styles.img}
        source={
          imageSource
            ? imageSource
            : {
                uri: imageUrl,
              }
        }
        fallbackSource={require("@/assets/images/imgNotFound.jpg")}
      />
      <ThemedText style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}
