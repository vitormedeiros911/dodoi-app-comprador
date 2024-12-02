import ScrollView from "@/components/ScrollView";
import ThemedInput from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { IUsuario } from "@/interfaces/usuario.interface";
import { api } from "@/services/api";
import { formatDate } from "@/utils/formatDate";
import { formatEndereco } from "@/utils/formatEndereco";
import { showToast } from "@/utils/showToast";
import { useFocusEffect } from "@react-navigation/native";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, useColorScheme } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import { createStyles } from "./styles";

type FormDataProps = {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export default function MeusDados() {
  const { setBackIndicator } = useHeader();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormDataProps>();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { startLoading, stopLoading } = useLoading();
  const [refreshing, setRefreshing] = useState(false);

  const getUsuario = async () => {
    try {
      const response = await api.get("/usuario/perfil");

      const usuarioData = response.data as IUsuario;

      setValue("nome", usuarioData.nome);
      setValue("cpf", usuarioData.cpf);
      setValue("email", usuarioData.email);
      setValue("telefone", usuarioData.telefone);

      if (usuarioData.dataNascimento)
        setValue("dataNascimento", formatDate(usuarioData.dataNascimento));

      if (usuarioData.endereco) {
        setValue("cep", usuarioData.endereco.cep);
        setValue("logradouro", usuarioData.endereco.logradouro);
        setValue("numero", usuarioData.endereco.numero);
        setValue("complemento", usuarioData.endereco.complemento);
        setValue("bairro", usuarioData.endereco.bairro);
        setValue("cidade", usuarioData.endereco.cidade);
        setValue("uf", usuarioData.endereco.uf);
      }
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Erro ao buscar dados do usuário.",
        "error"
      );
    }
  };

  const onSubmit = async (data: FormDataProps) => {
    try {
      startLoading();

      let formattedDate;
      if (data.dataNascimento) {
        const dia = data.dataNascimento.substring(0, 2);
        const mes = data.dataNascimento.substring(3, 5);
        const ano = data.dataNascimento.substring(6, 10);

        formattedDate = `${ano}-${mes}-${dia}`;
      }

      const endereco = formatEndereco(data);

      await api.put("/usuario", {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        telefone: data.telefone,
        dataNascimento: formattedDate,
        endereco,
      });

      showToast("Dados atualizados com sucesso!", "success");
    } catch (error: any) {
      showToast(error.response?.data?.message, "error");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      startLoading();
      await getUsuario();
      stopLoading();
    };

    fetchUsuario();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getUsuario();
    clearErrors();
    setRefreshing(false);
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
    <ScrollView
      style={styles.container}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    >
      <ThemedView style={styles.form}>
        <ThemedText style={styles.title}>Meus Dados</ThemedText>

        <Controller
          control={control}
          name="nome"
          rules={{ required: "Nome é obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>Nome*</ThemedText>
              <ThemedInput value={value} onChangeText={onChange} />
            </ThemedView>
          )}
        />
        <Controller
          control={control}
          name="cpf"
          rules={{ required: "CPF é obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>CPF*</ThemedText>
              <TextInputMask
                type="cpf"
                placeholder="Digite o seu CPF"
                keyboardType="number-pad"
                value={value}
                onChangeText={onChange}
                customTextInput={ThemedInput}
              />
            </ThemedView>
          )}
        />
        {errors.cpf && (
          <ThemedText style={styles.error}>{errors.cpf.message}</ThemedText>
        )}

        <Controller
          control={control}
          name="email"
          rules={{ required: "E-mail é obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>E-mail*</ThemedText>
              <ThemedInput
                value={value}
                onChangeText={onChange}
                style={{ opacity: 0.5 }}
                editable={false}
              />
            </ThemedView>
          )}
        />

        <Controller
          control={control}
          name="telefone"
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>Telefone</ThemedText>
              <TextInputMask
                placeholder="Digite o telefone"
                value={value}
                onChangeText={onChange}
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) ",
                }}
                customTextInput={ThemedInput}
              />
            </ThemedView>
          )}
        />
        <Controller
          control={control}
          name="dataNascimento"
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>Data de nascimento</ThemedText>
              <TextInputMask
                placeholder="DD/MM/AAAA"
                value={value}
                onChangeText={onChange}
                type={"datetime"}
                options={{
                  format: "DD/MM/YYYY",
                }}
                customTextInput={ThemedInput}
              />
            </ThemedView>
          )}
        />
        <ThemedText style={styles.title}>Endereço</ThemedText>
        <Controller
          control={control}
          name="cep"
          rules={{ required: "CEP é obrigatório.", minLength: 8 }}
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>CEP*</ThemedText>
              <TextInputMask
                placeholder="Digite o CEP"
                value={value}
                onChangeText={onChange}
                type={"custom"}
                options={{
                  mask: "99999-999",
                }}
                customTextInput={ThemedInput}
              />
            </ThemedView>
          )}
        />

        {errors.cep && (
          <ThemedText style={styles.error}>{errors.cep.message}</ThemedText>
        )}

        <ThemedView style={styles.row}>
          <ThemedView style={styles.inputContainer}>
            <Controller
              control={control}
              name="uf"
              rules={{ required: "UF é obrigatório." }}
              render={({ field: { onChange, value } }) => (
                <ThemedView>
                  <ThemedText style={styles.label}>Estado*</ThemedText>
                  <ThemedInput
                    placeholder="Selecione a UF"
                    value={value}
                    onChangeText={onChange}
                  />
                </ThemedView>
              )}
            />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <Controller
              control={control}
              name="cidade"
              rules={{ required: "Cidade é obrigatória." }}
              render={({ field: { onChange, value } }) => (
                <ThemedView>
                  <ThemedText style={styles.label}>Cidade*</ThemedText>
                  <ThemedInput
                    placeholder="Selecione a cidade"
                    value={value}
                    onChangeText={onChange}
                  />
                </ThemedView>
              )}
            />
          </ThemedView>
        </ThemedView>

        {errors.uf || errors.cidade ? (
          <ThemedText style={styles.error}>
            {errors.uf?.message || errors.cidade?.message}
          </ThemedText>
        ) : null}

        <Controller
          control={control}
          name="logradouro"
          rules={{ required: "Logradouro é obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>Logradouro*</ThemedText>
              <ThemedInput
                placeholder="Digite o logradouro"
                value={value}
                onChangeText={onChange}
              />
            </ThemedView>
          )}
        />
        {errors.logradouro && (
          <ThemedText style={styles.error}>
            {errors.logradouro.message}
          </ThemedText>
        )}
        <Controller
          control={control}
          name="numero"
          rules={{ required: "Número é obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>Número*</ThemedText>
              <ThemedInput
                placeholder="Digite o número do endereço"
                value={value}
                onChangeText={onChange}
              />
            </ThemedView>
          )}
        />
        {errors.numero && (
          <ThemedText style={styles.error}>{errors.numero.message}</ThemedText>
        )}
        <Controller
          control={control}
          name="bairro"
          rules={{ required: "Bairro é obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>Bairro*</ThemedText>
              <ThemedInput
                placeholder="Digite o bairro"
                value={value}
                onChangeText={onChange}
              />
            </ThemedView>
          )}
        />
        {errors.bairro && (
          <ThemedText style={styles.error}>{errors.bairro.message}</ThemedText>
        )}
        <Controller
          control={control}
          name="complemento"
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>Complemento</ThemedText>
              <ThemedInput
                placeholder="Digite o complemento"
                value={value}
                onChangeText={onChange}
                maxLength={100}
              />
            </ThemedView>
          )}
        />
        {errors.complemento && (
          <ThemedText style={styles.error}>
            {errors.complemento.message}
          </ThemedText>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.saveButton}
        >
          <ThemedText>Salvar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}
