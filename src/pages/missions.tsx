import type { ReactElement } from 'react'
import MainLayout from '@/shared/layouts/MainLayout';
import Missions from '@/routers/missions';

export default function MissionsPage() {
   return <Missions />;
}

MissionsPage.getLayout = function getLayout(page: ReactElement) {
   return (
      <MainLayout>
         {page}
      </MainLayout>
   )
}