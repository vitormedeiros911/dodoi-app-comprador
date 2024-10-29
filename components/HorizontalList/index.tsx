import React from "react";
import { FlatList, FlatListProps, View } from "react-native";

import { styles } from "./styles";
import { ThemedView } from "../ThemedView";

interface HorizontalListProps<T> extends FlatListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
}

export default function HorizontalList<T extends unknown>({
  data,
  renderItem,
  ...props
}: HorizontalListProps<T>) {
  return (
    <ThemedView style={styles.container}>
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
