import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import AppInput from '../src/components/AppInput.js';

import AppButton from '../src/components/AppButton.js';

import { router } from 'expo-router';

import { supabase } from '../src/services/supabase.js';


export default function Login() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);


  const login = async () => {

    if (!email || !password) {

      Alert.alert(
        'Atenção',
        'Preencha o e-mail e a senha.'
      );

      return;
    }


    try {

      setLoading(true);

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });


      if (error) {

        console.log('Erro no login:', error);

        Alert.alert(
          'Erro ao entrar',
          error.message
        );

        return;
      }


      console.log('Login realizado:', data);

      Alert.alert(
        'Sucesso',
        'Login realizado com sucesso!'
      );


      // Altere para a rota que existe no seu projeto
      router.replace('/home');

    } catch (erro) {

      console.log('Erro inesperado:', erro);

      Alert.alert(
        'Erro',
        'Ocorreu um erro ao fazer login.'
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <View style={styles.container}>

        <Text style={styles.title}>
          MEU BOLSO
        </Text>

        <Text style={styles.subtitle}>
          Controle suas finanças.
        </Text>


        <AppInput
          label="E-mail"
          placeholder="Digite seu e-mail"
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
          placeholder="Digite a sua senha"
        />


        <AppButton
          title="Entrar"
          loading={loading}
          onPress={login}
        />

        <TouchableOpacity
          onPress={() => router.push('/Register')}
        >

          <Text style={styles.link}>
            Criar nova conta
          </Text>

        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#2f3640',
    textAlign: 'center'
  },

  subtitle: {
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32
  },

  link: {
    color: '#008f22',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700'
  },

});
