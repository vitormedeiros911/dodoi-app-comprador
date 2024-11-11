import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import type { PropsWithChildren } from "react";
type Props = PropsWithChildren<{}>;

interface ScrollViewProps {
  onScrollToTop?: () => void;
  style?: any;
  lightColor?: string;
  darkColor?: string;
}

export default function ScrollView({
  children,
  onScrollToTop,
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
