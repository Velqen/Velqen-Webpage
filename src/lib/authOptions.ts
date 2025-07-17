import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
      async signIn({ user }) {
        const { email } = user;
        if (!email) {
          console.error("❌ Missing email from user object");
          return false;
        }

        // Check if user already exists (optional but cleaner than repeated inserts)
        const { data: existing, error: lookupError } = await supabaseAdmin
          .from("user_information")
          .select("id")
          .eq("user_email", email)
          .maybeSingle();

        if (lookupError) {
          console.error("❌ Supabase lookup error:", lookupError.message);
          return false;
        }

        if (!existing) {
          const { error } = await supabaseAdmin
            .from("user_information")
            .insert({ user_email: email });

          if (error) {
            console.error("❌ Supabase insert error:", error.message);
            return false;
          }
        }
        return true;
      },
    },
};
