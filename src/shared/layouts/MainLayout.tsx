import { ReactNode, useState } from "react";

type Props = {
   children: ReactNode;
}

export default function MainLayout({ children }: Props) {
   const [count, setCount] = useState(0)

   return (
      <div>
         {children}
      </div>
   )
}