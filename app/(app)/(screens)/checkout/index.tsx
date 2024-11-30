import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useCarrinho } from "@/hooks/useCarrinho";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { IUsuario } from "@/interfaces/usuario.interface";
import { api } from "@/services/api";
import { formatBRL } from "@/utils/formatBRL";
import { showToast } from "@/utils/showToast";
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
  const [usuario, setUsuario] = useState<IUsuario>({} as IUsuario);
  const [quantia, setQuantia] = useState(600);
  const [loading, setLoading] = useState(false);
  const [voucher, setVoucher] = useState("");
  const { setBackIndicator } = useHeader();
  const { carrinho, limparCarrinho } = useCarrinho();
  const { startLoading, stopLoading } = useLoading();
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

  const getUsuario = async () => {
    try {
      const response = await api.get("/usuario/perfil");

      setUsuario(response.data);
    } catch (error: any) {
      showToast(error.response.data.message, "error");
    }
  };

  const fetchPaymentSheetParams = async () => {
    const response = await api.post("/pagamento", {
      nomeComprador: user.nome,
      emailComprador: user.email,
      quantia: Math.round(quantia * 100),
      idFarmacia: carrinho[0].idFarmacia,
      itens: carrinho.map((item) => ({
        idProduto: item.idProduto,
        precoUnitario: item.precoUnitario,
        quantidade: item.quantidade,
        endereco: usuario.endereco,
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
    if (!usuario || !usuario.endereco || !usuario.cpf) {
      Alert.alert(
        "Cadastro incompleto",
        "Você precisa concluir seu cadastro antes de finalizar o pedido.",
        [
          {
            text: "Cancelar",
            onPress: () => {},
          },
          {
            text: "Concluir cadastro",
            onPress: () => router.replace("/meus-dados"),
          },
        ]
      );
      return;
    }

    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    setLoading(false);

    if (error) {
      Alert.alert(
        `Erro: ${error.code}`,
        "Não foi possível finalizar o pedido."
      );
    } else {
      limparCarrinho();
      router.replace("/(app)/(tabs)/pedidos");

      showToast("Pedido realizado com sucesso!", "success");
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      startLoading();
      await getUsuario();
      stopLoading();
    };

    fetchUsuario();
    setQuantia(calcularPrecoTotal());
  }, [carrinho]);

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
      {usuario.endereco ? (
        <ThemedText style={styles.address}>
          {usuario.endereco.logradouro} {usuario.endereco.numero}{" "}
          {usuario.endereco.bairro}, {usuario.endereco.cidade} -{" "}
          {usuario.endereco.uf}
        </ThemedText>
      ) : (
        <ThemedText style={styles.address}>Endereço não cadastrado</ThemedText>
      )}

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
