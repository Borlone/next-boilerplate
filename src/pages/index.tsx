import type { ReactElement } from 'react';
import MainLayout from '@/shared/layouts/MainLayout';
import ConnectWallet from '@/shared/components/wagmi/WalletConnect';

export default function Home() {

   return (
      <div>
         <ConnectWallet />
      </div>
   );
}

Home.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>;
};
