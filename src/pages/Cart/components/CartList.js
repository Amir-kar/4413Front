import {  useState } from "react";
import { CartCard } from "./CartCard";
import { Checkout } from "./Checkout";
import { useCart } from "../../../context";
import { Link } from "react-router-dom";

export const CartList = () => {
  const [checkout, setCheckout] = useState(false);
  const {cartList,total}=useCart();

  return (
    <>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          My Cart ({cartList.length})
        </p>
      </section>
      

      <section>
        {cartList.map((product) => (
          <CartCard key={product.id} product={product} />
        ))}
      </section>

      <section className="max-w-4xl m-auto">
        <div className="flex flex-col p-2 border-b dark:border-slate-700 text-lg dark:text-slate-100">
          <p className="flex justify-between my-2">
            <span className="font-semibold">Total Amount: $</span>
            <span>{total}</span>
          </p>
        </div>
        <div className="my-5 flex flex-wrap justify-between items-center">
          <Link to="/products" type="button" className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Continue Shopping <i className="ml-2 bi bi-cart"></i></Link>
      
          <button onClick={() => setCheckout(!checkout)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
            PLACE ORDER <i className="ml-2 bi bi-arrow-right"></i>
          </button>
        </div>
      </section>
      {checkout && <Checkout setCheckout={setCheckout} />}
    </>
  )
}