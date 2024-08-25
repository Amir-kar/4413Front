//these functions are for login, logout and register

import { getSession } from "./dataService";
import url from "../../assets/json/url.json";

//send a POST request to login
//a POST is used to be able to use the body 
export async function login(authDetail){
    const response=await fetch(url.url+"login",{
      method:"POST",
      headers:{"content-Type":"application/json"},
      body:JSON.stringify(authDetail)
    });
    console.log("fshfkjd");
    
    const data=await response.json();
    console.log(data);
    
    if(data.accessToken){//if successful write the information to sessionStorage
      sessionStorage.setItem("type",JSON.stringify(data.user.type));
      sessionStorage.setItem("token",JSON.stringify(data.accessToken));
      sessionStorage.setItem("cbid",JSON.stringify(data.user.id));
    }
    return data;
}

//send a POST request to register
export async function register(authDetail){
    const response=await fetch(url.url+"register",{
      method:"POST",
      headers:{"content-Type":"application/json"},
      body:JSON.stringify(authDetail)
    });
    const data=await response.json();
    if(data.accessToken){//if successful write the information to sessionStorage
      sessionStorage.setItem("type",JSON.stringify(data.user.type));
      sessionStorage.setItem("token",JSON.stringify(data.accessToken));
      sessionStorage.setItem("cbid",JSON.stringify(data.user.id));
    }
    return data;

}

//used to logout. Removes all user information in session storage
export function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("cbid");
}