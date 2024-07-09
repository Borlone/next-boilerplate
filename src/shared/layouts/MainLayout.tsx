import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

type Props = {
   children: ReactNode;
};

export default function MainLayout({ children }: Props) {
   return (
      <div className={`app ${inter.className}`}>
         <div className='header'>
            <div className='navbar'>
               <Link className='nav-item' href="/dashboard">Dashboard</Link>
               <Link className='nav-item' href="/missions">Missions</Link>
            </div>
         </div>
         <div className='main'>
            {children}
         </div>
         <div className='footer'>Footer</div>
      </div>
   );
}
