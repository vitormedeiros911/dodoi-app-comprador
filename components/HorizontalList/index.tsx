import { Colors } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

interface HorizontalListProps<T> extends FlatListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  title: string;
  loading?: boolean;
}

export default function HorizontalList<T extends { id: string | number }>({
  data,
  renderItem,
  title,
  loading,
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
        ListFooterComponent={
          loading && data.length > 0 ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.mainColor} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          loading && data.length === 0 ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.mainColor} />
            </View>
          ) : (
            <ThemedText style={styles.title}>Nenhum item encontrado</ThemedText>
          )
        }
        {...props}
      />
    </ThemedView>
  );
}
