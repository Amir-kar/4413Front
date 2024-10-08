import { useEffect, useState } from "react"
import { Rating } from "../components/";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { useCart } from "../context/cartContext";
import { getProduct } from "../services";
import { toast } from "react-toastify";

export const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { cartList, addToCart, removeFromCart } = useCart();

  const [inCart, setInCart] = useState(false);
  useTitle(product.name);

  useEffect(() => {
    const inCart = cartList.find(item => item.id === product.id);
    if (inCart) {
      setInCart(true);
    }
    else {
      setInCart(false);
    }
  }, [cartList, product.id]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        toast.error(error.message);
      }

    }
    fetchProducts();
  }, [id]);

  return (
    <main>
      <section>
        <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{product.name}</h1>
        <div className="flex flex-wrap justify-around">
          <div className="max-w-xl my-3">
            <img className="rounded" src={product.poster} alt="" />
          </div>
          <div className="max-w-xl my-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
              <span className="mr-1">$</span>
              <span className="">{product.price}</span>
            </p>
            <p className="my-3">
              <span>
                <Rating rating={product.rating} />
              </span></p>
            <p className="my-4 select-none">
              
              <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">{product.productAmount} Left!</span>
              </p>
            <p className="my-3">
              {!inCart && <button onClick={() => addToCart(product)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 `} >Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>}
              {inCart && <button onClick={() => removeFromCart(product)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 `} >Remove Item <i className="ml-1 bi bi-trash3"></i></button>}
            </p>
            <p className="text-lg text-gray-900 dark:text-slate-200">
              {product.description}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}