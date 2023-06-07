'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

export default function Nav() {
   const userLoggedIn = true;
   const [providers, setProviders] = useState(null);

   useEffect(() => {
      async function retriveProviders() {
         const response = await getProviders();
         setProviders(response);
      }
      retriveProviders();
   }, []);

   return (
      <nav className='flex-between w-full mb-16 pt-3'>
         <Link href='/' className='flex-center gap-2'>
            <Image
               src='/assets/images/logo.svg'
               width='30'
               height='30'
               alt='Promptastic logo'
               className='object-contain'
            />
            <p className='logo_text'>Promptastic</p>
         </Link>

         {/* Desktop Navigation */}
         <div className="sm:flex hidden">
            {userLoggedIn
               ? <div className='flex gap-3 md:gap-5'>

                  <Link href='/create-prompt' className='black_btn'>
                     Create Post
                  </Link>

                  <button
                     type='button'
                     onClick={signOut}
                     className='outline_btn'
                  >
                     Sign Out
                  </button>

                  <Link href='/Profile'>
                     <Image
                        src='/assets/images/logo.svg'
                        width='37'
                        height='37'
                        className='rounded-full'
                        alt='profile'
                     />
                  </Link>

               </div>
               : <>
                  {providers && Object.values(providers).map(provider => (
                     <button
                        type='button'
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='black_btn'
                     >
                        Sign In
                     </button>
                  ))}
               </>}
         </div>
      </nav>
   )
}