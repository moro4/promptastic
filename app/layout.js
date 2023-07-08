import '@styles/globals.css';
import { Nunito } from 'next/font/google';
import Nav from '@components/nav';
import Provider from '@components/provider';

// If loading a variable font, you don't need to specify the font weight
const nunito = Nunito({
   subsets: ['latin'],
   display: 'swap'
});

export const metadata = {
   title: 'Promptastic',
   description: 'Discover & Share AI Prompts'
};

export default function RootLayout({ children }) {
   return (
      <html lang="en" className={nunito.className}>
         <body>
            <Provider>
               <div className='main'>
                  <div className='gradient'></div>
               </div>
               <main className='app'>
                  <Nav />
                  {children}
               </main>
            </Provider>
         </body>
      </html>
   )
}