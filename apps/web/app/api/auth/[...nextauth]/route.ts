import { prisma } from "@repo/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
interface cred{
  name?: string
  phone :string
  password :string
}
export const authOptions={
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        name: { label: "Username", type: "text", placeholder: "jeo" },
        phone: { label: "Mobile", type: "text", placeholder: "9876765459" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        if (!credentials?.phone || !credentials?.password) return null;
        const { phone, password, name } = credentials as cred

        // 1. Check if user exists
        const exist = await prisma.user.findFirst({
          where: { phone, password }
        });

        if (exist) {
          return { id: exist.id, name: exist.name };
        }

        //  Create user if not found (Signup on Login logic)
        try {
          const user = await prisma.user.create({
            data: { name, phone, password,Balance:{create:{amount:0,locked:0}} }
          });
          return { id: user.id, name: user.name };
        } catch (err) {
          console.error("Auth creation error:", err);
          return null; // Signals auth failure
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
     callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }:any) {
      if (session.user) {
        session.user.id = token.id ;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
