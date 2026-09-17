import React, { useState } from 'react';
import { Text, KeyboardAvoidingView, StyleSheet, Platform, View, Alert } from 'react-native';
import AppInput from '../src/components/AppInput.js';
import AppButton from '../src/components/AppButton.js';
import { useRouter } from 'expo-router';
import { signUp } from '../src/services/authService.js';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleRegister() {
        if (!email.trim() || !password || !confirm) {
            return Alert.alert('Atenção', 'Preencha todos os campos');
        }
        if (password.length < 6) {
            return Alert.alert('Atenção', 'A senha deve ter no mínimo 6 caracteres');
        }
        if (password !== confirm) {
            return Alert.alert('Atenção', 'As senhas não coincidem');
        }

        try {
            setLoading(true);
            const { data, error } = await signUp(email.trim(), password);
            if (error) {
                Alert.alert('Erro', error.message);
                console.log('Erro', error.message);
                return;
            }
            if (data.session) {
                router.replace('/'); // defina a rota certa aqui
            } else {
                Alert.alert('Sucesso', 'Cadastro realizado, confirme seu e-mail');
                router.replace('/');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Criar conta</Text>
                <AppInput
                    label="E-mail"
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
                />
                <AppInput
                    label="Confirmar senha"
                    secureTextEntry
                    value={confirm}
                    onChangeText={setConfirm}
                />
                <AppButton title="Criar conta" onPress={handleRegister} loading={loading} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
        color: '#2f3640',
        marginBottom: 28,
    },
});