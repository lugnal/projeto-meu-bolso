import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AppInput from "../src/components/AppInput.js";

export default function Register() {
    return (
    <View style={styles.container}>
        <Text style={styles.CRconta}>Criar conta</Text>
        <Text style={styles.inputEmail}>Email:</Text>
        <appInput placeholder="none"
        <Text style={styles.inputSenha}>Senha:</Text>
    </View>
    );  
}


const styles = StyleSheet.create({
    CRconta: {
        fontSize: 34,
        fontWeight: '900',
        color: '#2f3640',
        textAlign: 'center'
    },
    inputEmail: {
        color: '#0c848d', textAlign: 'center', marginTop: 8,
        marginBottom: 32
    },
    inputSenha: {
         color: '#0c848d', textAlign: 'center', marginTop: 8,
        marginBottom: 32
    }
})