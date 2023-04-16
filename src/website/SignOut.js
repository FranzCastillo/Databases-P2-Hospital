import {supabase} from "../supabase/client";

export default async function SignOut() {
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.log('Error signing out:', error.message);
    }
}