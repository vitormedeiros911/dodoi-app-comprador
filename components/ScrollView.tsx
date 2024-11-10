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
}

export default function ScrollView({
  children,
  onScrollToTop,
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
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        onScroll={scrollHandler} // Usando o scrollHandler para detectar o movimento
      >
        <ThemedView style={styles.content}>{children}</ThemedView>
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
    overflow: "hidden",
  },
});
