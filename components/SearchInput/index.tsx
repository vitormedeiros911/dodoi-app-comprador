import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

type SearchInputProps = {
  setBusca: (busca: string) => void;
};

export default function SearchInput({ setBusca }: SearchInputProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const [text, setText] = useState("");
  const [iconAnim] = useState(new Animated.Value(0));

  const handleClear = () => {
    setText("");
    setBusca("");
  };

  const animateIcon = () => {
    Animated.timing(iconAnim, {
      toValue: text ? 1 : 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateIcon();
  }, [text]);

  const iconScale = iconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Remédio ou Farmácia"
        placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
        value={text}
        onChangeText={(newText) => {
          setText(newText);
          setBusca(newText);
        }}
      />
      <View style={styles.separator} />
      <TouchableOpacity onPress={handleClear}>
        <Animated.View
          style={{
            transform: [{ scale: iconScale }],
          }}
        >
          <Ionicons
            name={text ? "close" : "search-outline"}
            size={24}
            color={Colors.mainColor}
            style={styles.icon}
          />
        </Animated.View>
      </TouchableOpacity>
    </ThemedView>
  );
}
