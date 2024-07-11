import type { ReactElement } from 'react';
import MainLayout from '@/shared/layouts/MainLayout';
import useTrans from '@/shared/hooks/useTrans';

export default function Home() {
   const trans = useTrans();

   return (
      <div>
         <h3>{trans.home.title}</h3>
      </div>
   );
}

Home.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
