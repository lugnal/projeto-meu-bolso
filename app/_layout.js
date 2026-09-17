import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
    <Stack>
        <Stack.Screen name="index"
        ScreenOptions={{ HeaderShown: false }}/>
        <Stack.Screen name="Register" options={{title:'Criar conta'}}/>
        </Stack>
    );
}