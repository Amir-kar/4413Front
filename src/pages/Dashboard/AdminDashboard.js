import { useEffect, useState } from "react";
import { DashbaordEmpty } from "./components/DashboardEmpty";
import { DashbaordList } from "./components/DashboardList";
import { getUserOrders } from "../../services";
import { useTitle } from "../../hooks/useTitle";

export const AdminDashboard = () => {
  const [showAdmin,setShow]=useState(false);
  const [allOrder,setShowAll]=useState([]);
  const [orders, setOrders] = useState([]);
  useTitle("Admin Dashboard");
  useEffect(() => {


    async function getOrder() {
      const data = await getUserOrders();
      setOrders(data);
    }
    getOrder();
  }, []);
  function handleAdmin(){
    if(allOrder){
      async function getOrder() {
        const data = await getUserOrders();
        setShowAll(data);
      }
      getOrder();
      setShow(true);
    }
  }
  return (
    <main>
      <section>
        <p className="grid grid-cols-2 divide-x text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
        <span className="" onClick={()=>setShow(false)}>My Dashboard</span>
        
        <span className="" onClick={()=>handleAdmin()}>My Admin Dashboard</span>
      
        </p>
        </section>
      {!showAdmin&&<section>
        {orders.length>0 && orders.map((order) => (
          <DashbaordList key={order.id} order={order} />
        ))}
      </section>}
      {showAdmin&&<section>
        {orders.length>0 && allOrder.map((order) => (
          <DashbaordList key={order.id} order={order} />
        ))}
      </section>}
      <section>
        {!showAdmin&&!orders.length && <DashbaordEmpty />}
      </section>
    </main>
  )
}