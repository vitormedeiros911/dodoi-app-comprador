import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ColorSchemeName,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

export default function MenuPerfil() {
  const colorScheme = useColorScheme();
  const styles = createColorScheme(colorScheme);
  const { signOut } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.navigate("/meus-dados")}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={styles.menuText}>Meus Dados</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons
          name="card-outline"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={styles.menuText}>Cobrança</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => signOut()}>
        <Ionicons
          name="log-out-outline"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={styles.menuText}>Sair</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const createColorScheme = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },

    menuItem: {
      padding: 16,
      borderTopWidth: 1,
      borderColor: Colors[colorScheme ?? "light"].border,
      flexDirection: "row",
      alignItems: "center",
    },

    menuText: {
      marginLeft: 16,
      fontSize: 16,
    },
  });
