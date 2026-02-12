// app/_lib/auth.ts

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },

    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  pages : {
    signIn : "/login"
  }
});
