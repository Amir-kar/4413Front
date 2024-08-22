import { useEffect, useState } from "react";
import { DashbaordEmpty } from "./components/DashboardEmpty";
import { DashbaordList } from "./components/DashboardList";
import { getUserOrders, logout } from "../../services";
import { useTitle } from "../../hooks/useTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";

export const Dashboard = () => {
  const {clearCart } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useTitle("Dashboard");
  useEffect(() => {


    async function getOrder() {
      try{
        const data = await getUserOrders();
        setOrders(data);
        console.log(data);
      }
      catch(error){
        if(error.status ==401){
          toast.error("Session Expired. Please log in again");
        }
        else{
          toast.error(error.message);
        }
        clearCart();
        logout();
        navigate('/login');
      }
      
      
    }
    getOrder();
  }, []);
  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
      </section>
      <section>
        {orders.length>0 && orders.map((order) => (
          <DashbaordList key={order.id} order={order} />
        ))}
      </section>
      <section>
        {!orders.length && <DashbaordEmpty />}
      </section>
    </main>
  )
}