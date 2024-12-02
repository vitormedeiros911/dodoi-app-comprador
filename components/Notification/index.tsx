import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, useColorScheme, View } from "react-native";

import { ThemedText } from "../ThemedText";
import { createStyles } from "./styles";

type Props = {
  title: string;
  body: string;
  onClose: () => void;
};

export function Notification({ title, body, onClose }: Props) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsVisible(false);
        onClose();
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [slideAnim, fadeAnim, onClose]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.row}>
        <Ionicons
          name="notifications-outline"
          size={20}
          color={Colors[colorScheme ?? "light"].tint}
          style={styles.icon}
        />

        <View>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.text} numberOfLines={2}>
            {body}
          </ThemedText>
        </View>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons
            name="close-outline"
            size={20}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
