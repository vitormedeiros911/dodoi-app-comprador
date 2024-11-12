import { useThemeColor } from "@/hooks/useThemeColor";
import { RefreshControl, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import type { PropsWithChildren } from "react";
type Props = PropsWithChildren<{}>;

interface ScrollViewProps {
  onScrollToTop?: () => void;
  onRefresh?: () => Promise<void>;
  refreshing?: boolean;
  style?: any;
  lightColor?: string;
  darkColor?: string;
}

export default function ScrollView({
  children,
  onScrollToTop,
  onRefresh,
  refreshing = false,
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
