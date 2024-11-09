import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },

    title: {
      fontSize: 18,
      fontWeight: "500",
      color: colorScheme === "light" ? "#000" : "#fff",
      padding: 8,
      marginBottom: 8,
    },

    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: 200, // Definir uma altura específica para garantir que o carregamento fique centralizado
      marginVertical: 20, // Adicionando margem para melhorar a apresentação
    },
  });
};
