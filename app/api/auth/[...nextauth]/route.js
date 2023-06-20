import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB} from '@utils/database';
import User from '@models/user';

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
            console.log('PROFILE OBJECT: ', profile);
            await connectToDB();
            const userExists = await User.findOne({email: profile.email});
            if (!userExists) {
               await User.create({
                  email: profile.email,
                  username: profile.name.replace(' ', ''),
                  image: profile.picture
               });
            }
            return true;
         } catch (error) {
            console.log(error);
            return false;
         }
      },
      async session({session}) {
         console.log('SESSION OBJECT: ', session);
         const sessionUser = await User.findOne({email: session.user.email});
         session.user.id = sessionUser._id.toString();
         return session;
      }
   }
})

export { handler as GET, handler as POST }