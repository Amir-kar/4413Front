import { useEffect, useState } from "react";
import { DashbaordEmpty } from "./components/DashboardEmpty";
import { DashbaordList } from "./components/DashboardList";
import { deleteAdminOrder, deleteOrder, getAllUserOrders, getUserOrders } from "../../services";
import { useTitle } from "../../hooks/useTitle";
import { FilterDash } from "./components/filterDash";
import { useCart, useFilterDash } from "../../context";
import { handleError } from "../../components/";
import { useNavigate } from "react-router-dom";
import { AdminDashList } from "./components/AdminDashList";
import { FilterSVG } from "../../assets";
import { toast } from "react-toastify";

export const AdminDashboard = () => {
  useTitle("Admin Dashboard");
  const [filter, setShowFilter] = useState(false);
  const [showAdmin, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const { productList, initialProductList } = useFilterDash();
  const { clearCart } = useCart();
  const  navigate  = useNavigate();

  useEffect(() => {
    async function getOrder() {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        handleError(error);
        clearCart();
        navigate('/login');
      }
    }
    getOrder();
  }, []);

  async function handleAdminDelete(orderID){
    console.log(orderID);
    try{
      await deleteAdminOrder(orderID);
      initialProductList(productList.filter(order=>order.id!==orderID));

    }catch(error){
      toast.error(error.message);
    }
  }

  async function handleDelete(orderID){
    try{
      await deleteOrder(orderID);
      setOrders(orders.filter(order=>order.id!==orderID));
    }catch(error){
      toast.error(error.message);
    }
  }

  function handleAdmin() {
    if (!productList.length) {
      async function getOrder() {
        try {
          const data = await getAllUserOrders();
          initialProductList(data);
        } catch (error) {
          handleError(error);
          clearCart();
          navigate('/login');
        }
      }
      getOrder();
    }
    setShow(true);
  }
  return (
    <main>
      <section>
        <p className="grid grid-cols-2 divide-x text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          <span className="" onClick={() => setShow(false)}>My Dashboard</span>

          <span className="" onClick={() => handleAdmin()}>My Admin Dashboard</span>

        </p>
      </section>
      {!showAdmin && <section>
        {orders.length > 0 && orders.map((order) => (
          <DashbaordList key={order.id} order={order} handleDelete={handleDelete}/>
        ))}

      </section>}
      {showAdmin && <section>
        <div className="float-right">
          <span>
            <button onClick={() => setShowFilter(!filter)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" type="button">
              <FilterSVG/>  
            </button>
          </span>
        </div>
        {productList.map((order) => (
          <AdminDashList key={order.id} order={order} handleDelete={handleAdminDelete} />
        ))}
        {filter && <FilterDash setShow={setShowFilter} />}
      </section>}
      <section>
        {!showAdmin && !orders.length && <DashbaordEmpty />}
      </section>
    </main>
  )
}