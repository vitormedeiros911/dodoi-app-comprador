import React from "react";
import { ActivityIndicator, View } from "react-native";

import { styles } from "./styles";

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={"#000"} />
    </View>
  );
}
