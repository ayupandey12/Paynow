import { prisma } from "@repo/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        const { phone, password, name } = credentials;

        // 1. Check if user exists
        const exist = await prisma.user.findFirst({
          where: { phone, password }
        });

        if (exist) {
          return { id: exist.id, name: exist.name };
        }

        // 2. Create user if not found (Signup on Login logic)
        try {
          const user = await prisma.user.create({
            data: { name, phone, password }
          });
          return { id: user.id, name: user.name };
        } catch (err) {
          console.error("Auth creation error:", err);
          return null; // Signals auth failure
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

// Use this syntax for Next.js App Router
export { handler as GET, handler as POST };
