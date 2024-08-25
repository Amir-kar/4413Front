import { useNavigate } from "react-router-dom";
import { useCart } from "../../context";
import { toast } from "react-toastify";
import { getAllUsers, getUser, getUserOrders, patchAdmin, patchUser } from "../../services";
import { useEffect, useState } from "react";
import { handleError } from "../../components";
import { UserCard } from "./components/UserCard";
import { ListUserCards } from "./components/ListUserCards";
import { useTitle } from "../../hooks/useTitle";

export const AdminINFO = () => {
    useTitle("Admin Information");
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [user, setUser] = useState({ wallet: {} });
    const [showAdmin, setShow] = useState(false);
    const [allUser, setAllUser] = useState([]);


    useEffect(() => {
               
        async function fetchData() {
            try{
                const data=await getUser();
                setUser(data);
            }catch(error){
                handleError(error);
                clearCart();
                navigate('/login');
        }};
        fetchData();
    }, []);

    function handleAdmin() {
        if (!allUser.length) {
            async function getOrder() {
                try {
                    const data = await getAllUsers();
                    console.log(data);
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
    }
    function handleChange({
        card = user?.card,
        month = user?.wallet?.month,
        year = user?.wallet?.year,
        cvv = user?.wallet?.cvv }) {

        const data = {
            id: user.id,
            email:user.email,
            name: user.name,
            wallet: {
                card: card,
                month: month,
                year: year,
                cvv: cvv
            }
        }
        setUser(data);
    }
    async function updateUser() {
        try {
            await patchUser(user);
            toast.success("User Inforation changed");
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <main>
            <section>
                <p className="grid grid-cols-2 divide-x text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
                    <span className="" onClick={() => setShow(false)}>My Dashboard</span>

                    <span className="" onClick={() => handleAdmin()}>My Admin Dashboard</span>

                </p>
                {!showAdmin && <UserCard handleChange={handleChange} updateUser={updateUser} user={user} />}
                {showAdmin && allUser.map((user) => (
                    <ListUserCards key={user.id} user={user} />
                ))}

            </section>
        </main>
    )
}