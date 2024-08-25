import { useEffect, useState } from "react"
import { handleError } from "../../components";
import { useNavigate } from "react-router-dom";
import { getUser, patch } from "../../services";
import { UserCard } from "./components/UserCard";
import { toast } from "react-toastify";


export const UserINFO = () => {
    const  navigate  = useNavigate();

    const [user, setUser] = useState({ wallet: {} });

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getUser();
                setUser(data);

            } catch (error) {
                handleError(error);
                navigate('/login');
            }
        }
        fetchData();
    }, []);
    
    function handleChange({
        name = user.name,
        card = user?.card,
        month = user?.wallet?.month,
        year = user?.wallet?.year,
        cvv = user?.wallet?.cvv }) {

        const data = {
            id: user.id,
            name: name,
            type: user.type,
            password: user.password,
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
        <main>
            
            <UserCard handleChange={handleChange} updateUser={updateUser} user={user} />
        </main>
    )
}