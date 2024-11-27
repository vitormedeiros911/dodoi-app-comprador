import React, { memo } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import ImageWithFallback from "../ImageWithFallback";
import { ThemedText } from "../ThemedText";
import { createStyles } from "./styles";

interface ICardProps {
  image: string;
  title: string;
  price: number;
  defaultSource: any;
  onPress?: () => void;
}

const Card = memo(
  ({ image, price, title, defaultSource, onPress }: ICardProps) => {
    const colorScheme = useColorScheme();
    const styles = createStyles(colorScheme);

    return (
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <ImageWithFallback
          source={{ uri: image }}
          fallbackSource={defaultSource}
          style={styles.image}
        />

        <ThemedText style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </ThemedText>
        <ThemedText style={styles.price}>R$ {price}</ThemedText>
      </TouchableOpacity>
    );
  }
);

export default Card;
