import React, { useState } from "react";

import { router } from "expo-router";

import { supabase } from "../src/services/supabase.js";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";

import AppInput from "../src/components/AppInput.js";
import AppButton from "../src/components/AppButton.js";


export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(false);


  const cadastrar = async () => {

    if (!usuario || !email || !password) {

      Alert.alert(
        "Atenção",
        "Preencha todos os campos."
      );

      return;
    }


    try {

      setLoading(true);


      // 1️⃣ Cria o usuário no Supabase Auth
      const {
        data: authData,
        error: authError
      } = await supabase.auth.signUp({

        email: email.trim(),

        password: password

      });


      if (authError) {

        Alert.alert(
          "Erro ao cadastrar",
          authError.message
        );

        return;
      }


      // Pega o ID do usuário criado
      const userId = authData.user?.id;


      if (!userId) {

        Alert.alert(
          "Erro",
          "Não foi possível obter o ID do usuário."
        );

        return;

      }


      // 2️⃣ Salva o perfil na tabela usuarios
      const { error: profileError } =
        await supabase
          .from("usuarios")
          .insert({

            id: userId,

            nome: usuario,

            email: email.trim()

          });


      if (profileError) {

        console.log(
          "Erro ao criar perfil:",
          profileError
        );

        Alert.alert(
          "Erro ao salvar perfil",
          profileError.message
        );

        return;

      }


      Alert.alert(
        "Sucesso!",
        "Conta criada com sucesso."
      );


      router.replace("/");


    } catch (erro) {

      console.log(
        "Erro inesperado:",
        erro
      );

      Alert.alert(
        "Erro",
        "Ocorreu um erro inesperado."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >

      <View style={styles.container}>

        <Text style={styles.title}>
          CADASTRAR
        </Text>


        <AppInput
          label="Usuário"
          placeholder="Nome do usuário"
          autoCapitalize="words"
          value={usuario}
          onChangeText={setUsuario}
        />


        <AppInput
          label="E-mail"
          placeholder="Seu e-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />


        <AppInput
          label="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Digite a senha"
        />


        <AppButton
          title="Cadastrar"
          loading={loading}
          onPress={cadastrar}
        />


        <TouchableOpacity
          onPress={() => router.push("/home")}
        >

          <Text style={styles.link}>
            Já tenho uma conta
          </Text>

        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f8f9fa"
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#2f3640",
    textAlign: "center",
    height: 70
  },

  link: {
    color: "#008f22",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "700"
  }

});