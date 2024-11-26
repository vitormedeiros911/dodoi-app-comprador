import ScrollView from "@/components/ScrollView";
import ThemedInput from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, TouchableOpacity, useColorScheme } from "react-native";

import { formatEndereco } from "../../../../utils/formatEndereco";
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
  estado: string;
};

interface IUsuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}

export default function MeusDados() {
  const { setBackIndicator } = useHeader();
  const { control, setValue, handleSubmit } = useForm<FormDataProps>();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { startLoading, stopLoading } = useLoading();

  const getUsuario = async () => {
    try {
      const response = await api.get("/usuario/perfil");
      const usuarioData = response.data as IUsuario;

      setValue("nome", usuarioData.nome);
      setValue("cpf", usuarioData.cpf);
      setValue("email", usuarioData.email);
      setValue("telefone", usuarioData.telefone);
      setValue("dataNascimento", usuarioData.dataNascimento);

      if (usuarioData.endereco) {
        setValue("cep", usuarioData.endereco.cep);
        setValue("logradouro", usuarioData.endereco.logradouro);
        setValue("numero", usuarioData.endereco.numero);
        setValue("complemento", usuarioData.endereco.complemento);
        setValue("bairro", usuarioData.endereco.bairro);
        setValue("cidade", usuarioData.endereco.cidade);
        setValue("estado", usuarioData.endereco.estado);
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar usuário");
      console.log(error);
    }
  };

  const onSubmit = async (data: FormDataProps) => {
    const endereco = formatEndereco(data);

    try {
      startLoading();
      await api.put("/usuario", {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        telefone: data.telefone,
        dataNascimento: data.dataNascimento,
        endereco,
      });

      Alert.alert("Sucesso", "Usuário atualizado com sucesso");
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar usuário");
      console.log(error);
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

  useFocusEffect(
    useCallback(() => {
      setBackIndicator(true);

      return () => {
        setBackIndicator(false);
      };
    }, [setBackIndicator])
  );

  return (
    <ScrollView style={styles.container}>
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
              <ThemedInput
                placeholder="***.***.***-**"
                value={value}
                onChangeText={onChange}
              />
            </ThemedView>
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{ required: "E-mail é obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>E-mail*</ThemedText>
              <ThemedInput value={value} onChangeText={onChange} />
            </ThemedView>
          )}
        />

        <Controller
          control={control}
          name="telefone"
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>Telefone</ThemedText>
              <ThemedInput
                placeholder="(XX) XXXXX-XXXX"
                value={value}
                onChangeText={onChange}
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
              <ThemedInput
                placeholder="DD/MM/AAAA"
                value={value}
                onChangeText={onChange}
              />
            </ThemedView>
          )}
        />
        <ThemedText style={styles.title}>Endereço</ThemedText>
        <Controller
          control={control}
          name="cep"
          rules={{ required: "CEP é obrigatório." }}
          render={({ field: { onChange, value } }) => (
            <ThemedView>
              <ThemedText style={styles.label}>CEP*</ThemedText>
              <ThemedInput
                placeholder="CEP"
                value={value}
                onChangeText={onChange}
              />
            </ThemedView>
          )}
        />
        <ThemedView style={styles.row}>
          <ThemedView style={styles.inputContainer}>
            <Controller
              control={control}
              name="estado"
              rules={{ required: "Estado é obrigatório." }}
              render={({ field: { onChange, value } }) => (
                <ThemedView>
                  <ThemedText style={styles.label}>Estado*</ThemedText>
                  <ThemedInput
                    placeholder="Selecione o estado"
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
              />
            </ThemedView>
          )}
        />
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
