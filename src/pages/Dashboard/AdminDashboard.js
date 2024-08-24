import { useEffect, useState } from "react";
import { DashbaordEmpty } from "./components/DashboardEmpty";
import { DashbaordList } from "./components/DashboardList";
import { getUserOrders } from "../../services";
import { useTitle } from "../../hooks/useTitle";
import { FilterDash } from "./components/filterDash";
import { useCart, useFilterDash } from "../../context";
import { handleError } from "../../components/";
import { useNavigate } from "react-router-dom";
import { AdminDashList } from "./components/AdminDashList";
import { FilterSVG } from "../../assets";

export const AdminDashboard = () => {
  const [filter, setShowFilter] = useState(false);
  const [showAdmin, setShow] = useState(false);
  const [orders, setOrders] = useState([]);

  const { productList, initialProductList } = useFilterDash();
  useTitle("Admin Dashboard");
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
  function handleAdmin() {
    if (!productList.length) {
      async function getOrder() {
        try {
          const data = await getUserOrders();
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
      console.log(productList);
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
          <DashbaordList key={order.id} order={order} />
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
        {orders.length > 0 && productList.map((order) => (
          <AdminDashList key={order.id} order={order} />
        ))}
        {filter && <FilterDash setShow={setShowFilter} />}
      </section>}
      <section>
        {!showAdmin && !orders.length && <DashbaordEmpty />}
      </section>
    </main>
  )
}