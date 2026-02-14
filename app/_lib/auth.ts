// app/_lib/auth.ts

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./services";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.id = guest.id;
      return session;
    },

    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({user , account , profile}){
      try {
        if (!user.email) return false;
        const existing = await getGuest(user.email);
        if(!existing) {
          await createGuest({email : user.email , name : user.name || ""})
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    
  },
  
  pages : {
    signIn : "/login"
  }
});
