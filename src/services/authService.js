import { supabase } from "./supabase.js";

export const signUp=(email,password) => supabase.auth.signUp({email,password});