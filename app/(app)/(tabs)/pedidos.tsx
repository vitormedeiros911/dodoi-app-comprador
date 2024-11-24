import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import {
  ColorSchemeName,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";

interface IPedido {
  id: string;
  status: string;
  total: number;
}

export default function Pedidos() {
  const [refreshing, setRefreshing] = useState(false);
  const [pedidos, setPedidos] = useState<IPedido[]>([] as IPedido[]);
  const colorScheme = useColorScheme();
  const styles = createColorScheme(colorScheme);
  const { startLoading, stopLoading } = useLoading();
  const { session } = useAuth();

  const getPedidos = async () => {
    try {
      const response = await api.get("pedido", {
        params: {
          idComprador: session.user.id,
          limit: 10,
        },
      });
      setPedidos(response.data.pedidos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      await getPedidos();
      stopLoading();
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getPedidos();
    setRefreshing(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Meus pedidos</ThemedText>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ThemedText>{item.total}</ThemedText>}
      />
    </ThemedView>
  );
}

const createColorScheme = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },

    list: {
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 20,
      marginLeft: 20,
    },
  });
