'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

export default function Nav() {

   //   Return value of useSession() hook:
   //
   //    {
   //       "data": {
   //           "user": {
   //               "name": "first second",
   //               "email": "myemail@gmail.com",
   //               "image": "https://lh3.googleusercontent.com/...",
   //               "id": "SOMEIDTOKEN"
   //           },
   //           "expires": "YYYY-MM-DDTHH:MM:SS"
   //       },
   //       "status": "authenticated"
   //   }
   const {data: sessionData, status: loginStatus} = useSession();

   const [providers, setProviders] = useState(null);
   const [toggleDropDown, setToggleDropDown] = useState(false);

   useEffect(() => {
      async function retrieveProviders() {
         const response = await getProviders();
         setProviders(response);
      }
      retrieveProviders();
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
            {loginStatus === 'authenticated'
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

                  <Link href='/profile'>
                     <Image
                        src={sessionData.user.image}
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

         {/* Mobile Navigation */}
         <div className='sm:hidden flex relative'>
            {loginStatus === 'authenticated'
               ? <div className='flex'>

                  <Image
                     src={sessionData.user.image}
                     width='37'
                     height='37'
                     className='rounded-full'
                     alt='profile'
                     onClick={() => setToggleDropDown(state => !state)}
                  />

                  {toggleDropDown &&
                     <div className='dropdown'>

                        <Link
                           href='/profile'
                           className='dropdown_link'
                           onClick={() => setToggleDropDown(false)}
                        >
                           My Profile
                        </Link>

                        <Link
                           href='/create-prompt'
                           className='dropdown_link'
                           onClick={() => setToggleDropDown(false)}
                        >
                           Create Prompt
                        </Link>

                        <button
                           type='button'
                           onClick={() => {setToggleDropDown(false); signOut()}}
                           className='mt-5 w-full black_btn'
                        >
                           Sign Out
                        </button>

                     </div>
                  }

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
               </>
            }
         </div>
      </nav>
   )
}