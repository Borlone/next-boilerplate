import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import ErrorBoundary from '@/shared/components/ErrorBoundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '@/configs/wagmi';
import '@/styles/globals.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
   getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
   // Use the layout defined at the page level, if available
   const getLayout = Component.getLayout ?? ((page) => page);

   return getLayout(
      <WagmiProvider config={config}>
         <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
               <Component {...pageProps} />
            </ErrorBoundary>
         </QueryClientProvider>
      </WagmiProvider>
      ,
   );
}
