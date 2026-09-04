import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url=process.env.EXPO_PUBLIC_SUPABASE_URL;
const ker=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase=createClient(url,keyframes,{
    auth: {
        storage:AsyncStorage,
        autoRefreshToken:true,
        persistSession:true,
        detectSessionInUrl:false,
    },
});