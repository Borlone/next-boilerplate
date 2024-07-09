import type { ReactElement } from 'react'
import MainLayout from '@/shared/layouts/MainLayout';

export default function Home() {
   return (
      <div>
         <h3>Hello world</h3>
      </div>
   );
}

Home.getLayout = function getLayout(page: ReactElement) {
   return (
      <MainLayout>
         {page}
      </MainLayout>
   )
}