'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';
import * as DDMenu from '@radix-ui/react-dropdown-menu';
import '@styles/ddmenu.css';

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
                        className='black_btn cursor-pointer'
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
                  <DDMenu.Root>
                     <DDMenu.Trigger>
                        <Image
                           src={sessionData.user.image}
                           width='37'
                           height='37'
                           className='rounded-full'
                           alt='profile'
                        />
                     </DDMenu.Trigger>
                     <DDMenu.Content
                        className='DDMenuContent'
                        sideOffset={7} align='end' loop='true'
                     >
                        <Link href='/'>
                           <DDMenu.Item className='DDMenuItem'>
                              <Image
                                 src="assets/images/home.svg"
                                 width='18'
                                 height='18'
                                 alt='home icon'
                                 className='LeftSlot'
                              />
                              Main
                           </DDMenu.Item>
                        </Link>
                        <Link href='/profile'>
                           <DDMenu.Item className='DDMenuItem'>
                              <Image
                                 src="assets/images/person.svg"
                                 width='18'
                                 height='18'
                                 alt='user icon'
                                 className='LeftSlot'
                              />
                              My Profile
                           </DDMenu.Item>
                        </Link>
                        <Link href='/create-prompt'>
                           <DDMenu.Item className='DDMenuItem'>
                              <Image
                                 src="assets/images/pencil.svg"
                                 width='18'
                                 height='18'
                                 alt='pencil icon'
                                 className='LeftSlot'
                              />
                              Create Prompt
                           </DDMenu.Item>
                        </Link>
                        <DDMenu.Separator className='DDMenuSeparator' />
                        <button type='button' onClick={() => signOut()}
                           className='w-full'
                        >
                           <DDMenu.Item className='DDMenuItem'>
                              <Image
                                 src="assets/images/exit.svg"
                                 width='18'
                                 height='18'
                                 alt='sign out icon'
                                 className='LeftSlot'
                              />
                              Sign Out
                           </DDMenu.Item>
                        </button>
                     </DDMenu.Content>
                  </DDMenu.Root>
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