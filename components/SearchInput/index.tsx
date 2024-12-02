import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Keyboard,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

type SearchInputProps = {
  placeholder: string;
  setBusca: (busca: string) => void;
};

export default function SearchInput({
  setBusca,
  placeholder,
}: SearchInputProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const [text, setText] = useState("");
  const [iconAnim] = useState(new Animated.Value(0));

  const handleClear = () => {
    setText("");
    setBusca("");
    Keyboard.dismiss();
  };

  const animateIcon = () => {
    Animated.spring(iconAnim, {
      toValue: text ? 1 : 0,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateIcon();

    if (text === "") setBusca("");
    else if (text.length >= 3) setBusca(text);
  }, [text, setBusca]);

  const iconScale = iconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const iconOpacity = iconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
        value={text}
        onChangeText={(newText) => {
          setText(newText);
        }}
      />
      <View style={styles.separator} />
      <TouchableOpacity onPress={handleClear}>
        <Animated.View
          style={{
            transform: [{ scale: iconScale }],
            opacity: iconOpacity,
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
