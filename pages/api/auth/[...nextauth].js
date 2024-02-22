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

        const response = await fetch(`http://localhost:8888/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer {response.token}",
            },
            body: JSON.stringify({ email, password }),
          });

        const data = await response.json();

        const token = data.token;
        
        return { email: data.email };
      },
    }),
  ],
});
