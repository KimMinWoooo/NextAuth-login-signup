import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
import  NextAuth  from 'next-auth';
import  CredentialsProvider  from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('아이디를 찾을 수 없습니다.');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('로그인 불가');
        }
        client.close();
        return { email: user.email };
        
      },
    }),
  ],
});
