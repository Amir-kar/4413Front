
function getSession() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));

  return { token: token, id: cbid }

}
export async function getUser() {
  const brData = getSession();

  const responce = await fetch(`http://localhost:8000/600/users/${brData.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` }
  });
  if (!responce.ok) {
    throw {
      message: responce.statusText,
      status: responce.status
    };
  }

  const data = responce.json();
  return data;
}
export async function getUserOrders() {

  const brData = getSession();

  const responce = await fetch(`http://localhost:8000/660/orders?user.id=${brData.id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` }
  });
  if (!responce.ok) {
    throw {
      message: responce.statusText,
      status: responce.status
    };
  }
  const data = responce.json();
  return data;

}

function locationCheck(location){
  if(location.address===""&&location.city===""&&location.country===""){
    throw{
      message:"Billing Information Completely",
      status:400
    }
  }
}
export async function createOrder(cartList, total, user, allowChange) {
  try{
    locationCheck(user.location);
  }catch(error){
    throw{
      message:"Please Fill Billing Information Completely",
      status:400
    }
  }
  const brData = getSession();


  if (!allowChange) {
    patch(user, brData);
  }
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
  console.log(user);
  
  const responce = await fetch("http://localhost:8000/660/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` },
    body: JSON.stringify(order)
  });
  if (!responce.ok) {
    throw {
      message: responce.statusText,
      status: responce.status
    };
  }
  const data = await responce.json();
  return data;
}
async function patch(user, brData) {
  const responce = await fetch("http://localhost:8000/600/users/" + user.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` },
    body: JSON.stringify(user)
  });
  const data = await responce.json();
  if (!responce.ok) {
    console.log(data);
    throw {
      message: responce.statusText,
      status: responce.status
    }
  }
}