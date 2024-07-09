export default function Dashboard() {
   const a: any = {};
   const throwError = () => {
      console.log(a.name.age)
   }

   return (
      <div>
         <h3 onClick={throwError}>Dashboard</h3>
      </div>
   );
}