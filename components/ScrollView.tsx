import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View, RefreshControl } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import type { PropsWithChildren } from "react";
type Props = PropsWithChildren<{}>;

interface ScrollViewProps {
  onScrollToTop?: () => void;
  onRefresh?: () => Promise<void>; // Adiciona a prop de refresh
  refreshing?: boolean; // Adiciona a prop de estado de atualização
  style?: any;
  lightColor?: string;
  darkColor?: string;
}

export default function ScrollView({
  children,
  onScrollToTop,
  onRefresh,
  refreshing = false, // Inicializa como falso por padrão
  style,
  lightColor,
  darkColor,
}: Props & ScrollViewProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const scrollHandler = useAnimatedScrollHandler((event) => {
    if (event.contentOffset.y === 0) {
      if (onScrollToTop) {
        onScrollToTop();
      }
    }
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor }, style]}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    >
      <View style={styles.content}>{children}</View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    overflow: "hidden",
  },
});
