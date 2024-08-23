import { toast } from "react-toastify";
import { logout } from "../../services";

export const handleError = ( error ) => {
    
    if (error.status === 401) {
        toast.error("Session Expired. Please log in again");
        logout();
    }
    else {
        toast.error(error.message);
    }
    

}