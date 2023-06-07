import '@styles/globals.css';
import { Inter } from 'next/font/google';
import Nav from '@components/nav';
import provider from '@components/provider';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
   subsets: ['latin'],
   display: 'swap'
});

export const metadata = {
   title: 'Promptastic',
   description: 'Discover & Share AI Prompts'
};

export default function RootLayout({ children }) {
   return (
      <html lang="en" className={inter.className}>
         <body>
            <div className='main'>
               <div className='gradient'></div>
            </div>
            <main className='app'>
               <Nav />
               {children}
            </main>
         </body>
      </html>
   )
}