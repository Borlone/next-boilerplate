import type { ReactElement } from 'react';
import MainLayout from '@/shared/layouts/MainLayout';
import Dashboard from '@/routers/dashboard';

export default function DashboardPage() {
   return <Dashboard />;
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
