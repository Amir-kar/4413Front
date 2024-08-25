//function involving user information

import { patch } from "./authService";
import url from "../../assets/json/url.json";

//get information on current user. Used mostly by Element/dropdownLoggedIn , and ./pages/Cart
export async function geAlltUsers() {
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
export async function getAllUserOrders() {

  const brData = getSession();

  const responce = await fetch(`${url.url}660/orders`, {
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


