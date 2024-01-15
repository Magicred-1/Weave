import { createClient, SupabaseClient } from "@supabase/supabase-js";

//CLIENT SUPABASE
const supabaseClient: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET!,
    {
        realtime: {
            params: {
                eventsPerSecond: 2,
            },
        },
    }
);

export default supabaseClient;