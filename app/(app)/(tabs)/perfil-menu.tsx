import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ColorSchemeName,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { api } from "@/services/api";

export default function MenuPerfil() {
  const colorScheme = useColorScheme();
  const styles = createColorScheme(colorScheme);
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleInactivateAccount = async () => {
    await api.patch("/usuario/inativar");

    setModalVisible(false);
    signOut();
  };

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
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.navigate("/cartao")}
      >
        <Ionicons
          name="card-outline"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={styles.menuText}>Cobrança</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
        <ThemedText style={styles.menuText}>Inativar Conta</ThemedText>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ThemedText style={styles.modalText}>
              Tem certeza que deseja inativar sua conta? Esta ação não pode ser
              desfeita.
            </ThemedText>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <ThemedText style={styles.cancelButtonText}>
                  Cancelar
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inactivateButton}
                onPress={handleInactivateAccount}
              >
                <ThemedText style={styles.inactivateButtonText}>
                  Inativar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    modalContainer: {
      width: "80%",
      backgroundColor: Colors[colorScheme ?? "light"].background,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },

    modalText: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 20,
    },

    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },

    cancelButton: {
      flex: 1,
      marginRight: 8,
      padding: 12,
      borderRadius: 8,
      backgroundColor: "#f2f2f2",
      alignItems: "center",
    },

    cancelButtonText: {
      color: "black",
      fontSize: 16,
    },

    inactivateButton: {
      flex: 1,
      marginLeft: 8,
      padding: 12,
      borderRadius: 8,
      backgroundColor: Colors.error,
      alignItems: "center",
    },

    inactivateButtonText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
