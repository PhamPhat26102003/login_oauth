import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Lấy user từ localStorage (chỉ demo, không bảo mật)
        if (credentials?.username && credentials?.password) {
          // Đọc email từ localStorage (chỉ chạy ở client)
          let email = "";
          if (typeof window !== "undefined") {
            const saved = localStorage.getItem("demo-user");
            if (saved) {
              const user = JSON.parse(saved);
              if (
                user.username === credentials.username &&
                user.password === credentials.password
              ) {
                email = user.email;
              }
            }
          }
          return { id: "1", name: credentials.username, email };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.name) session.user.name = token.name;
      if (token.email) session.user.email = token.email;
      return session;
    },
  },
};

export default NextAuth(authOptions);
