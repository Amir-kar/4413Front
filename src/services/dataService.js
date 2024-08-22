
function getSession(){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));

    return {token:token,id:cbid}

}
export async function getUser() {
    const brData=getSession();

    const responce = await fetch(`http://localhost:8000/600/users/${brData.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` }
    });
    if(!responce.ok){
        throw {
          message:responce.statusText,
          status: responce.status
        };
      }
    
    const data = responce.json();
    return data;
}
export async function getUserOrders() {
    
    const brData=getSession();

    const responce = await fetch(`http://localhost:8000/660/orders?user.id=${brData.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` }
    });
    if(!responce.ok){
        throw {
          message:responce.statusText,
          status: responce.status
        };
      }
    const data = responce.json();
    return data;

}
export async function createOrder(cartList, total, user,allowChange) {
  const brData=getSession();
  
  if(!allowChange){
    patch(user,brData);
  }

    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }
    console.log(order);
    const responce = await fetch("http://localhost:8000/660/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` },
        body: JSON.stringify(order)
    });
    if(!responce.ok){
        throw {
          message:responce.statusText,
          status: responce.status
        };
      }
    const data = await responce.json();
    return data;
}
async function patch(user,brData) {
  const responce = await fetch("http://localhost:8000/600/users/"+user.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${brData.token}` },
    body: JSON.stringify(user)
  });
  const data =await responce.json();
  if(!responce.ok){
    console.log(data);
    throw{
      message:responce.statusText,
      status:responce.status
    }
  }
}