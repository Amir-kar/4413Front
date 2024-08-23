import { Navigate } from "react-router-dom";


export const Protected = ({children}) => {
    const token=JSON.parse(sessionStorage.getItem("token"));
  return token? children :<Navigate to="/login"/>
}
export const AdminProtected = ({children}) => {
  const token=JSON.parse(sessionStorage.getItem("type"));
return token.toUpperCase()==="ADMIN"? children :<Navigate to="/"/>
}
export const UserProtected = ({children})=>{
  const token=JSON.parse(sessionStorage.getItem("type"));
  return token.toUpperCase()==="USER"?children:<Navigate to="/adminDashboard"/>
}