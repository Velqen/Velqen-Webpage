import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const GOOGLE_SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/gmail.readonly",
].join(" ");

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: GOOGLE_SCOPES,
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : undefined;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
    async signIn({ user }) {
      const { email } = user;
      if (!email) {
        console.error("❌ Missing email from user object");
        return false;
      }

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
