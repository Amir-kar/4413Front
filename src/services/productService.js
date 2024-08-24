//Differnet GET fetch requests involving getting products

//GET all Products 
export async function getList() {
  const response = await fetch(`http://localhost:8000/444/products`);

  //if something went wrong throw error
  if(!response.ok){
    throw {
      message:response.statusText,
      status: response.status
    };
  }
  const data = await response.json();
  return data;

}

//Get certain product depending on its ID
export async function getProduct(id) {
  const response = await fetch(`http://localhost:8000/444/products/${id}`);

    //if something went wrong throw error
  if(!response.ok){
    throw {
      message:response.statusText,
      status: response.status
    };
  }
  const data = await response.json();
  return data;
}