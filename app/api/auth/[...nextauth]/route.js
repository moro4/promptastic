import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB} from '@utils/database';

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
   ],
   callbacks: {
      async signIn({profile}) {
         try {
            // await connectToDB();
            console.log('PROFILE OBJECT: ', profile);
            return true;
         } catch (error) {
            console.log(error);
            return false;
         }
      },
      async session({session}) {

      }
   }
})

export { handler as GET, handler as POST }