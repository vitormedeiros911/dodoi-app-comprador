import { TouchableOpacity } from "react-native";

import ImageWithFallback from "../ImageWithFallback";
import { ThemedText } from "../ThemedText";
import { styles } from "./styles";

type ListItemProps = {
  imageUrl?: string;
  title: string;
  imageSource?: any;
};

export default function ListItem({
  imageUrl,
  imageSource,
  title,
}: ListItemProps) {
  return (
    <TouchableOpacity style={styles.container}>
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
