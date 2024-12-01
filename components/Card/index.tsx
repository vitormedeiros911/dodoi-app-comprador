import React, { memo } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import { formatBRL } from "@/utils/formatBRL";
import ImageWithFallback from "../ImageWithFallback";
import { ThemedText } from "../ThemedText";
import { createStyles } from "./styles";

interface ICardProps {
  image: string;
  title: string;
  price: number;
  defaultSource: any;
  onPress?: () => void;
  style?: any;
}

const Card = memo(
  ({ image, price, title, defaultSource, onPress, style }: ICardProps) => {
    const colorScheme = useColorScheme();
    const styles = createStyles(colorScheme);

    const imageSource = image ? { uri: image } : defaultSource;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
        <ImageWithFallback
          source={imageSource}
          fallbackSource={defaultSource}
          style={styles.image}
        />

        <ThemedText style={styles.price}>{formatBRL(price)}</ThemedText>
        <ThemedText style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </ThemedText>
      </TouchableOpacity>
    );
  }
);

export default Card;
