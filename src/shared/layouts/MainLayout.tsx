import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

type Props = {
   children: ReactNode;
};

export default function MainLayout({ children }: Props) {
   const router = useRouter();

   const changeLanguage = (lang: string) => {
      router.push('/', '/', { locale: lang })
   }

   return (
      <div className={`app p-4 ${inter.className}`}>
         <div className='header flex justify-between'>
            <div className='navbar flex items-center gap-2'>
               <Link className='nav-item underline' href="/dashboard">Dashboard</Link>
               <Link className='nav-item underline' href="/missions">Missions</Link>
            </div>

            <div className='flex items-center gap-2'>
               <button onClick={() => changeLanguage('en')}>en</button>
               <button onClick={() => changeLanguage('vi')}>vi</button>
            </div>
         </div>
         <div className='main'>
            {children}
         </div>
         <div className='footer'>Footer</div>
      </div>
   );
}
