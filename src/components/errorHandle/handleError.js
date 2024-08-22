import { toast } from "react-toastify";
import { useCart } from "../../context/cartContext";
import { logout } from "../../services";
import { useNavigate } from "react-router-dom";

export const handleError = ({ error }) => {
    
    if (error.status === 401) {
        toast.error("Session Expired. Please log in again");
        logout();
    }
    else {
        toast.error(error.message);
    }
    

}