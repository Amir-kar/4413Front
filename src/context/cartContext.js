import { createContext, useContext, useReducer } from "react"
import { cartReducer } from "../reducer/cartReducer";

const cartInitialState = {
    cartList: [],
    total: 0
}
const CartContext = createContext(cartInitialState);
export const CartProvider = ({ children }) => {
    const [state,dispatch]=useReducer(cartReducer,cartInitialState);

    function addToCart(product){
        // console.log(state.cartList);
        const updatedList=state.cartList.concat(product);
        // console.log(updatedList);
        const updatedTotal=state.total + product.price;
        dispatch({
            type:"ADD_TO_CART",
            payload:{
                products:updatedList,
                total:updatedTotal
            }
        })
    }
    function removeFromCart(product){
        const updatedList=state.cartList.filter(item=>item.id !== product.id);
        const updatedTotal=state.total - product.price;

        dispatch({
            type:"REMOVE_FROM_CART",
            payload:{
                products:updatedList,
                total:updatedTotal
            }
        })
    }
    function clearCart(product){
        dispatch({
            type:"CLEAR_CART",
            payload:{
                products:[],
                total:0
            }
        })
    }

    const value = {
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
export const useCart=()=>{
    const context=useContext(CartContext);
    return context;
}