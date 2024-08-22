import { Navigate } from "react-router-dom";


export const AdminProtected = ({children}) => {
    const token=JSON.parse(sessionStorage.getItem("type"));
  return token.toUpperCase()==="ADMIN"? children :<Navigate to="/dashboard"/>
}
