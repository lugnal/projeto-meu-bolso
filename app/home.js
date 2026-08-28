import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { router } from "expo-router";

import { supabase } from "../src/services/supabase.js";


export default function Home() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    carregarUsuario();
  }, []);


  const carregarUsuario = async () => {

    try {

      // Pega o usuário que está logado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();


      if (userError || !user) {

        router.replace("/");

        return;

      }


      // Busca os dados do usuário na tabela usuarios
      const { data, error } = await supabase
        .from("usuarios")
        .select("nome, email")
        .eq("id", user.id)
        .single();


      if (error) {

        console.log("Erro ao buscar usuário:", error);

      } else {

        setNome(data.nome);
        setEmail(data.email);

      }

    } catch (erro) {

      console.log("Erro:", erro);

    } finally {

      setLoading(false);

    }

  };


  const sair = async () => {

    Alert.alert(
      "Sair",
      "Deseja realmente sair da conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Sair",

          style: "destructive",

          onPress: async () => {

            const { error } =
              await supabase.auth.signOut();


            if (error) {

              Alert.alert(
                "Erro",
                error.message
              );

              return;

            }


            router.replace("/");

          },
        },
      ]
    );

  };


  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Carregando...
        </Text>

      </View>

    );

  }


  return (

    <View style={styles.container}>

      {/* CABEÇALHO */}

      <View style={styles.header}>

        <View>

          <Text style={styles.bemVindo}>
            Bem-vindo,
          </Text>

          <Text style={styles.nome}>
            {nome || "Usuário"} 👋
          </Text>

        </View>


        <TouchableOpacity
          style={styles.sairButton}
          onPress={sair}
        >

          <Text style={styles.sairText}>
            Sair
          </Text>

        </TouchableOpacity>

      </View>


      {/* INFORMAÇÕES */}

      <View style={styles.card}>

        <Text style={styles.cardTitulo}>
          Minha Conta
        </Text>


        <Text style={styles.label}>
          Nome
        </Text>

        <Text style={styles.valor}>
          {nome}
        </Text>


        <Text style={styles.label}>
          E-mail
        </Text>

        <Text style={styles.valor}>
          {email}
        </Text>

      </View>


      {/* MENU */}

      <Text style={styles.menuTitulo}>
        Menu
      </Text>


      <TouchableOpacity
        style={styles.menuButton}
        onPress={() =>
          Alert.alert(
            "Em breve",
            "Esta função será adicionada."
          )
        }
      >

        <Text style={styles.menuIcon}>
          💰
        </Text>

        <Text style={styles.menuText}>
          Minhas Finanças
        </Text>

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.menuButton}
        onPress={() =>
          Alert.alert(
            "Em breve",
            "Esta função será adicionada."
          )
        }
      >

        <Text style={styles.menuIcon}>
          📊
        </Text>

        <Text style={styles.menuText}>
          Relatórios
        </Text>

      </TouchableOpacity>


      <TouchableOpacity
        style={styles.menuButton}
        onPress={() =>
          Alert.alert(
            "Em breve",
            "Esta função será adicionada."
          )
        }
      >

        <Text style={styles.menuIcon}>
          ⚙️
        </Text>

        <Text style={styles.menuText}>
          Configurações
        </Text>

      </TouchableOpacity>


    </View>

  );

}


const styles = StyleSheet.create({

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },


  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },


  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
    paddingTop: 60,
  },


  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },


  bemVindo: {
    fontSize: 16,
    color: "#7f8c8d",
  },


  nome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2f3640",
  },


  sairButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },


  sairText: {
    color: "#fff",
    fontWeight: "bold",
  },


  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },


  cardTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2f3640",
  },


  label: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 10,
  },


  valor: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2f3640",
  },


  menuTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2f3640",
  },


  menuButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",

    elevation: 2,
  },


  menuIcon: {
    fontSize: 25,
    marginRight: 15,
  },


  menuText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2f3640",
  },

});