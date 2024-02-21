import { verifyPassword } from "../../../lib/auth";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // 로그인 요청을 보냅니다.
        const response = await fetch(`http://localhost:8888/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

        const user = await response.json();
        
        return { email: user.email };
      },
    }),
  ],
});
