import { createClient } from '@supabase/supabase-js';

import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL || !env.DATABASE_KEY) {
	throw new Error('DATABASE_URL and DATABASE_KEY environment variables must be set');
}

export const database = createClient(env.DATABASE_URL, env.DATABASE_KEY, {
	auth: { persistSession: false }
});
