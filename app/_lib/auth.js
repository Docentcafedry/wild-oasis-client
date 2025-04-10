import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getGuest, createGuest } from "./data-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async authorized({ request, auth }) {
      return !!auth?.user;
    },
    async signIn({ account, profile }) {
      try {
        const guest = await getGuest(profile.email);

        if (guest) {
          return true;
        } else {
          await createGuest({ email: profile.email, fullName: profile.name });
        }
        return true;
      } catch (err) {
        return false;
      }
    },

    async session({ session, user, token }) {
      try {
        const guest = await getGuest(session.user.email);
        session.user.guestId = guest.id;
        return session;
      } catch (err) {
        return session;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});
