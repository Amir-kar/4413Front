//function involving user information
import url from "../../assets/json/url.json";
import { getSession } from "../userServices/dataService";

//get information on current user. Used mostly by Element/dropdownLoggedIn , and ./pages/Cart
export async function getAllUsers() {
  const brData = getSession();

  const responce = await fetch(`${url.url}664/users`, {
    method: "GET",
    // headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` }
  });


  //throw error if something went wrong
  if (!responce.ok) {
    throw {
      message: responce.statusText,
      status: responce.status
    };
  }

  const data = responce.json();
  return data;
}


//get All orders by current user
export async function getAllUserOrders() {

  const brData = getSession();

  const responce = await fetch(`${url.url}664/orders`, {
    method: "GET",
    // headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` }
  });

    //throw error if something went wrong
  if (!responce.ok) {
    throw {
      message: responce.statusText,
      status: responce.status
    };
  }
  const data = responce.json();
  return data;

}

//used if the user wants to update their information
export async function patchAdmin(user) {
  
  console.log(user);
  
  const brData = getSession();
  const responce = await fetch(url.url+"660/users/" + user.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json"
      , Authorization: `Bearer ${brData.token}` 
    },
    body: JSON.stringify(user)
  });
  const data = await responce.json();

    //throw error if something went wrong
  if (!responce.ok) {
    console.log(data);
    throw {
      message: responce.statusText,
      status: responce.status
    }
  }
}
export async function deleteAdminOrder(orderID){
  const brData=getSession();
  const responce=await fetch(`${url.url}664/orders/${orderID}`,{
    method:"DELETE",
    headers: { Authorization: `Bearer ${brData.token}` }
  });
  const data=await responce.json();
  console.log(data);
  if(!responce.ok){
    throw{
      message:responce.statusText,
      status:responce.status
    }
  }
}
