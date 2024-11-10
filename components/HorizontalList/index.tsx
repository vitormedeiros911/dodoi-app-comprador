// components/HorizontalList.tsx

import React from "react";
import {
  FlatList,
  FlatListProps,
  useColorScheme,
  View,
  StyleSheet,
} from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";
import LoadingOverlay from "../LoadingOverlay"; // Importando o LoadingOverlay

interface HorizontalListProps<T> extends FlatListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  title: string;
}

export default function HorizontalList<T extends { id: string | number }>({
  data,
  renderItem,
  title,
  ...props
}: HorizontalListProps<T>) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          data.length === 0 ? (
            <ThemedText style={styles.title}>Nenhum item encontrado</ThemedText>
          ) : null
        }
        {...props}
      />
    </ThemedView>
  );
}
