//function involving user information

import { patch } from "./authService";
import url from "../../assets/json/url.json";

//gets session information from sessionStorage
export function getSession() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));

  return { token: token, id: cbid }

}

//get information on current user. Used mostly by Element/dropdownLoggedIn , and ./pages/Cart
export async function getUser() {
  const brData = getSession();

  const responce = await fetch(`${url.url}600/users/${brData.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` }
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
export async function getUserOrders() {

  const brData = getSession();

  const responce = await fetch(`${url.url}660/orders?user.id=${brData.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` }
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

//used in createOrder to verify if the location bill was filled out
function locationCheck(location){
  if(location.address===""||location.city===""||location.country===""){
    
    //if there are any empty string throw error. 
    throw{
      message:"Billing Information Completely",
      status:400
    }
  }
}

//used to create an order by user
export async function createOrder(cartList, total, user, tempData) {
  try{
    console.log(user.location);
    locationCheck(user.location);
  }catch(error){
    
    //locationCheck can send two different errors 
    //1. is the intended thrown error seen above
    //2. is thrown by javascript when an undefined is being compared to an empty string
    //this catch and throw is intended to accound for error 2
    throw{
      message:"Please Fill Billing Information Completely",
      status:400
    }
  }
  const brData = getSession();

//if the user want to do change their billing information from check out 
  if (!tempData) {
    patch(user);
  }


  //the order that will be send to the backend
  const order = {
    cartList: cartList,
    amount_paid: total,
    quantity: cartList.length,
    user: {
      name: user.name,
      id: user.id,
      wallet: {
        card: user.wallet.card,
        month: user.wallet.month,
        year: user.wallet.year,
        cvv: user.wallet.cvv
      }
    }
  }
  
  const responce = await fetch(`${url.url}660/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` },
    body: JSON.stringify(order)
  });

    //throw error if something went wrong
  if (!responce.ok) {
    throw {
      message: responce.statusText,
      status: responce.status
    };
  }
  
  const data = user;
  return data;
}


