import { useEffect, useState } from "react";
import { useCart } from "../../../context/cartContext"
import { useNavigate } from "react-router-dom";
import { createOrder, getUser } from "../../../services";
import { handleError } from "../../../components/errorHandle/handleError";
import { toast } from "react-toastify";
import { Location, Wallet } from "./checkComp";
import { DropdownSVG } from "../../../assets";

export const Checkout = ({ setCheckout }) => {
    const { cartList, total, clearCart } = useCart();
    const navigate = useNavigate();


    const [tempData, setTempData]=useState(false);
    const [user, setUser] = useState({});
    const [fakeUser, setFake] =useState({});
    const [ wallet,setWallet]=useState({});
    const [ location,setLocation]=useState({});
    const [viewState,setView]=useState(0);

    
    useEffect(() => {
               
        async function fetchData() {
            try{
                const data=await getUser();
                setUser(data);
                setFake(data);
                setWallet(data.wallet);
            }catch(error){
                handleError(error);
                clearCart();
                navigate('/login');
        }};
        fetchData();
    }, []);

    async function handleOrder(event) {
        event.preventDefault();

        try {
            if(tempData){
                setUser(fakeUser);
            }
            const data=await createOrder(cartList,total,user,tempData);
            clearCart();
            navigate("/order", { state: { data: data, status: true } });
        } catch (error) {
            if(error.status===400){
                toast.error(error.message);
            }
            
            navigate("/order", { state: { status: false } });
        }
    }
    function handleChangeValues({
        name=fakeUser.name,
        card=wallet?.card,
        month=wallet?.month,
        year=wallet?.year,
        cvv=wallet?.cvv,
        address=location?.address,
        city=location?.city,
        country=location?.country}){
        const data={
            id:user.id,
            name:name,
            type:user.type,
            password:user.password,
            wallet:{
                card:card,
                month:month,
                year:year,
                cvv:cvv
            },
            location:{
                address:address,
                city:city,
                country:country
            }

        }
        setFake(data);
        setUser(data);
        setWallet(data.wallet);
        setLocation(data.location);
    }
    function changeView(formWhere){
        if(formWhere===viewState){
            setView(0);
        }
        else{
            setView(formWhere);
        }
    }

    return (
        <section>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            <div id="authentication-modal" tabIndex="-1" className="mt-5 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog" >
                <div className="relative p-4 w-full max-w-md h-full md:h-auto overflow-y-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setCheckout(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                <i className="bi bi-credit-card mr-2"></i>CARD PAYMENT
                            </h3>
                            <form onSubmit={handleOrder} className="space-y-6" >
                                <div>
                                    <label htmlFor="name" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={fakeUser.name || ""} onChange={e=>handleChangeValues({name:e.target.value})} required/>
                                </div>
                                <button type="button" onClick={()=>changeView(1)} className="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <div>My Wallet</div>
                                    <div><DropdownSVG/></div>
                                </button>
                                {viewState===1&&<Wallet wallet={wallet} handleChangeValues={handleChangeValues}/>}
                                
                                <button type="button" onClick={()=>changeView(2)} className="flex justify-between mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    <div>My Location</div>
                                    <div><DropdownSVG/></div>
                                </button>
                                {viewState===2&&<Location location={location} handleChangeValues={handleChangeValues}/>}
                                <div>
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={e=>setTempData(!tempData)} />
                                    <label htmlFor="code" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Use Temporary Information</label>                                
                                </div>
                                <p className="mb-4 text-2xl font-semibold text-lime-500 text-center">
                                    ${total}
                                </p>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" >
                                    <i className="mr-2 bi bi-lock-fill"></i>PAY NOW
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}