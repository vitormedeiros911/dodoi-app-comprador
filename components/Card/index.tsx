import React, { memo } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import ImageWithFallback from "../ImageWithFallback";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

interface ICardProps {
  image: string;
  title: string;
  price: number;
  defaultSource: any;
}

const Card = memo(({ image, price, title, defaultSource }: ICardProps) => {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <TouchableOpacity>
      <ThemedView style={styles.card} darkColor="#282828">
        <ThemedView style={styles.imageContainer}>
          <ImageWithFallback
            source={{ uri: image }}
            fallbackSource={defaultSource}
            style={styles.image}
          />
        </ThemedView>
        <ThemedView style={styles.textContainer}>
          <ThemedText
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </ThemedText>
          <ThemedText style={styles.price}>R$ {price}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
});

export default Card;
