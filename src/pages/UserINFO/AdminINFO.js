import { useNavigate } from "react-router-dom";
import { useCart } from "../../context";
import { toast } from "react-toastify";
import { getUserOrders, patch } from "../../services";
import { useState } from "react";
import { handleError } from "../../components";
import { UserCard } from "./components/UserCard";
import { ListUserCards } from "./components/ListUserCards";

export const AdminINFO = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [user, setUser] = useState({ wallet: {} });
    const [showAdmin, setShow] = useState(false);
    const [allUser,setAllUser]=useState({});
    function handleAdmin() {
        if (!allUser.length) {
            async function getOrder() {
                try {
                    const data = await getUserOrders();
                    setAllUser(data);
                    // initialProductList(data);
                } catch (error) {
                    handleError(error);
                    clearCart();
                    navigate('/login');
                }
            }
            getOrder();
        }
        setShow(true);
        console.log(allUser);
    }
    function handleChange({
        name = user.name,
        card = user?.card,
        month = user?.wallet?.month,
        year = user?.wallet?.year,
        cvv = user?.wallet?.cvv }) {

        const data = {
            id: user.id,
            name: name,
            wallet: {
                card: card,
                month: month,
                year: year,
                cvv: cvv
            }
        }
        setUser(data);
    }
    async function updateUser(event) {
        event.preventDefault();
        try{
            await patch(user);
            toast.success("User Inforation changed");
        }catch(error){
            toast.error(error.message);
        }
    }
    return (
        <section>
            <p className="grid grid-cols-2 divide-x text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
                <span className="" onClick={() => setShow(false)}>My Dashboard</span>

                <span className="" onClick={() => handleAdmin()}>My Admin Dashboard</span>

            </p>
            {!showAdmin&&<UserCard handleChange={handleChange} updateUser={updateUser} user={user} />}
            {showAdmin&& allUser.map((user)=>(
                <ListUserCards key={user.id} user={user}/>
            ))}
            
        </section>
    )
}