import { useCart } from "../../context/cartContext";
import { useTitle } from "../../hooks/useTitle";
import { CartList } from "./components/CartList";
import { EmptyCart } from "./components/EmptyCart";


export const CartPage = () => {
  const { cartList } = useCart();
  useTitle(`Cart(${cartList.length})`)

  return (
    <main>
      {cartList.length ? <CartList /> : <EmptyCart />}
    </main>
  )
}
