import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

interface ScrollViewProps {
  onScrollToTop?: () => void;
  style?: any;
  contentStyle?: any;
}

export default function ScrollView({
  children,
  onScrollToTop,
  style,
  contentStyle,
}: Props & ScrollViewProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    if (event.contentOffset.y === 0) {
      if (onScrollToTop) {
        onScrollToTop();
      }
    }
  });

  return (
    <ThemedView style={[styles.container, style]}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={[styles.content, contentStyle]}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    flexGrow: 1,
    overflow: "hidden",
  },
});
