import React from "react";
import { Image, useColorScheme } from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

interface ICardProps {
  image: string;
  title: string;
  price: number;
}

export default function Card({ image, price, title }: ICardProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <ThemedView style={styles.card} darkColor="#282828">
      <ThemedView style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </ThemedView>
      <ThemedView style={styles.textContainer}>
        <ThemedText style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </ThemedText>
        <ThemedText style={styles.price}>{price}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
