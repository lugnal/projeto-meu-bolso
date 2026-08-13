import { Text, TextInput, View, StyleSheet } from "react-native";
import { COLORS, RADIUS, SPACING } from "../constants/theme.js";

export default function AppInput({label, error, ...props}) {
 return (
    <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <TextInput style={[styles.input,error&&styles.errorInput]} placeholderTextColor={COLORS.muted} {...props}/>
        {error && <Text>{error}</Text>}
    </View>
 );
}

const styles = StyleSheet.create({ 
    container: {marginBottom: SPACING.md},
    label: {color:COLORS.text, fontWeigth: '600',marginBottom:6},
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        padding: SPACING.sm,
        fontSize: 16
    },
    errorInput: {borderColor: COLORS.danger},
    error: {color: COLORS.danger, fontSize: 12, marginTop: 4}
});