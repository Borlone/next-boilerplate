import { ReactNode } from 'react';

type Props = {
   children: ReactNode;
};

export default function MainLayout({ children }: Props) {
   return (
      <div className="main">
         <div>Header</div>
         {children}
      </div>
   );
}
