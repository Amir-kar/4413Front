import { Navigate } from "react-router-dom";

//This is used to used to stop non-logged in users to access logged in only webpages  

export const Protected = ({children}) => {

  //This will go to session storage and get the session token
  const token=JSON.parse(sessionStorage.getItem("token"));

  //This will check if the token is empty or null and redirect to the login screen, if not allow the user to proceed to the webpage
  return token? children :<Navigate to="/login"/>
}

//This is used to non-Admin users from accessing admin only webpages
export const AdminProtected = ({children}) => {
  const token=JSON.parse(sessionStorage.getItem("type"));

  //This checks if the user is an Admin, if not move to the main web page
return token.toUpperCase()==="ADMIN"? children :<Navigate to="/"/>
}

//this is used to stop Admins from entering /dashboard but to the /adminDashboard
//this is belived that to be an easier solution then to write a special condition in './../components/Element/DropdownLoggedIn.js'
//to create a button for the sole purpose for admins to visit /adminDashboard
export const UserProtected = ({children})=>{
  const token=JSON.parse(sessionStorage.getItem("type"));
  return token.toUpperCase()==="USER"?children:<Navigate to="/adminDashboard"/>
}