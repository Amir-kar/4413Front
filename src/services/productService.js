import url from "../assets/json/url.json";

//Differnet GET fetch requests involving getting products

//GET all Products 
export async function getList() {
  const response = await fetch(`${url.url}444/products`);

  //if something went wrong throw error
  if(!response.ok){
    throw {
      message:response.statusText,
      status: response.status
    };
  }
  const data = await response.json();
  console.log(typeof data);
  for (let i=1;i<data.length;i++){
    data[i]["quality"]=1;
  }
  
  return data;

}

//Get certain product depending on its ID
export async function getProduct(id) {
  const response = await fetch(`${url.url}444/products/${id}`);

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