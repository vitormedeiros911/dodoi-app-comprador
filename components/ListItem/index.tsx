import { Image, TouchableOpacity } from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";

type ListItemProps = {
  image: string;
  title: string;
};

export default function ListItem({ image, title }: ListItemProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: image,
        }}
      />
      <ThemedText style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}
