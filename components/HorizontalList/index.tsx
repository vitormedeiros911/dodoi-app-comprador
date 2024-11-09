import React from "react";
import { FlatList, FlatListProps, useColorScheme } from "react-native";

import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";
import { ThemedText } from "../ThemedText";

interface HorizontalListProps<T> extends FlatListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  title: string;
}

export default function HorizontalList<T extends unknown>({
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
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        {...props}
      />
    </ThemedView>
  );
}
