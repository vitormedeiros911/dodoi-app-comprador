import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useCarrinho } from "@/hooks/useCarrinho";
import { useHeader } from "@/hooks/useHeader";
import { api } from "@/services/api";
import { formatBRL } from "@/utils/formatBRL";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { createStyles } from "./styles";

export default function Checkout() {
  const [quantia, setQuantia] = useState(600);
  const [loading, setLoading] = useState(false);
  const [voucher, setVoucher] = useState("");
  const { setBackIndicator } = useHeader();
  const { carrinho, limparCarrinho } = useCarrinho();
  const { session } = useAuth();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const user = session.user;

  const calcularPrecoTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.precoUnitario * item.quantidade,
      0
    );
  };

  useEffect(() => {
    setQuantia(calcularPrecoTotal());
  }, [carrinho]);

  const fetchPaymentSheetParams = async () => {
    const response = await api.post("/pagamento", {
      nomeComprador: user.nome,
      emailComprador: user.email,
      quantia: Math.round(quantia * 100),
      itens: carrinho.map((item) => ({
        idProduto: item.idProduto,
        precoUnitario: item.precoUnitario,
        quantidade: item.quantidade,
      })),
    });
    const { paymentIntent, ephemeralKey, customer } = response.data;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Dodói",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      primaryButtonLabel: `Pagar ${formatBRL(quantia)}`,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        address: {
          country: "BR",
        },
      },
    });

    if (!error) setLoading(true);
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error)
      Alert.alert(
        `Erro: ${error.code}`,
        "Não foi possível finalizar o pedido."
      );
    else {
      limparCarrinho();
      setLoading(false);
      router.back();

      Alert.alert("Sucesso", "Pedido feito com sucesso!");
    }
  };

  useFocusEffect(
    useCallback(() => {
      setBackIndicator(true);

      return () => {
        setBackIndicator(false);
      };
    }, [setBackIndicator])
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Realizar Pedido</ThemedText>

      <ThemedText style={styles.label}>Endereço</ThemedText>
      <ThemedText style={styles.address}>Endereço qualquer XXX</ThemedText>

      <ThemedText style={styles.label}>Cupom</ThemedText>
      <TextInput
        style={styles.voucherInput}
        placeholder="Digite um cupom de desconto"
        placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
        value={voucher}
        onChangeText={(newVoucher) => {
          setVoucher(newVoucher);
        }}
      />

      <ThemedView style={styles.footer}>
        <ThemedText style={styles.amount}>
          Total: {formatBRL(quantia)}
        </ThemedText>
        <TouchableOpacity
          onPress={openPaymentSheet}
          disabled={loading}
          style={styles.checkoutButton}
        >
          <ThemedText>Finalizar Pedido</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
