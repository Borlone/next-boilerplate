import useTrans from '@/configs/hooks/useTrans';

export default function Dashboard() {
   const trans = useTrans();

   const a: any = {};
   const throwError = () => {
      console.log(a.name.age);
   };

   return (
      <div>
         <h3 onClick={throwError}>{trans.home.content}</h3>
      </div>
   );
}
