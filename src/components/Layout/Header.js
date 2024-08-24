import { Link } from "react-router-dom"
import logo from "../../assets/images/logo192.png"
import { useEffect, useState } from "react"
import { DropdownLoggedOut } from "../Element/DropdownLoggedOut";
import { DropdownLoggedIn } from "../Element/DropdownLoggedIn";
import { useCart } from "../../context/cartContext";


export const Header = () => {
    const {cartList}=useCart();
    const token=JSON.parse(sessionStorage.getItem("token"));
    const [dropdown,setDropdown]= useState(false);

    useEffect(()=>{
            document.documentElement.classList.add("dark");
        
    },[]);
    return (
        <header>
            <nav className="bg-white dark:bg-gray-900">
                <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-10" alt="CodeBook Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Damazon</span>
                    </Link>
                    <div className="flex items-center relative">
                        <Link to="/cart" className="text-gray-700 dark:text-white mr-5">
                            <span className="text-2xl bi bi-cart-fill relative">
                                <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{cartList.length} </span>
                            </span>
                        </Link>
                        <span onClick={()=>setDropdown(!dropdown)} className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>
                        {dropdown &&(token ?  <DropdownLoggedIn setDropdown={setDropdown}/>:<DropdownLoggedOut setDropdown={setDropdown}/>)}

                    </div>
                </div>
            </nav>
            
        </header>
    )
}
