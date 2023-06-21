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
         // profile object:
         //
         // {
         //    iss: 'https://accounts.google.com',
         //    azp: '...apps.googleusercontent.com',
         //    aud: '...apps.googleusercontent.com',
         //    sub: '113411755080659876609',
         //    email: 'someemail@gmail.com',
         //    email_verified: true,
         //    at_hash: 'somehash',
         //    name: 'first last',
         //    picture: 'https://lh3.googleusercontent.com/...',
         //    given_name: 'first',
         //    family_name: 'last',
         //    locale: 'en',
         //    iat: somenumber,
         //    exp: somenumber
         //  }
         try {
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
         // session object:
         //
         // {
         //    user: {
         //      name: 'first last',
         //      email: 'someemail@gmail.com',
         //      image: 'https://lh3.googleusercontent.com/...'
         //    },
         //    expires: 'YYYY-MM-DDTHH:MM:SS'
         //  }
         const sessionUser = await User.findOne({email: session.user.email});
         session.user.id = sessionUser._id.toString();
         return session;
      }
   }
})

export { handler as GET, handler as POST }