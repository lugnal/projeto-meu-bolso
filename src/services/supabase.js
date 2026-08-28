import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ykguwmfnznaskwfytjsj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_QN7-iftBrudCg8RFagUHdg_vA0IHJyR';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);