import React from "react";
import { Image } from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";

interface ICardProps {
  image: string;
  title: string;
  price: string;
}

export default function Card({ image, price, title }: ICardProps) {
  return (
    <ThemedView style={styles.card}>
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
