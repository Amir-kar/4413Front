import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../services";
import { useTitle } from "../../hooks/useTitle";

export const Register = () => {
  useTitle("Registration");
  const navigate=useNavigate();
  async function handleRegister(event){
    event.preventDefault();
    console.log(event.target.name.value+" fshjfjdshfjsdkjfhdk");
    const authDetail={
      email:event.target.name.value,
      name:event.target.name.value,
      password:event.target.password.value,
      type:"user",
      wallet:{
        card:event.target.card.value,
        month:event.target.month.value,
        year:event.target.year.value,
        cvv:event.target.code.value
      }
    }
    const data= await register(authDetail);
    if(data.accessToken){
      navigate("/products");
      toast.success("Successfully Registered");
    }
    else{
      toast.error(data);
    }
    
  }
    return (
      <main>
        <section>
          <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">Register</p>
        </section>
          <form onSubmit={handleRegister}>
            <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your name</label>
                <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Shubham Sarda" required autoComplete="off" />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required minLength="7" />
            </div>
           <div className="mb-6">
            <label htmlFor="card" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card Number:</label>
            <input type="number" name="card" id="card" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
          </div>
          <div className="mb-6 flex" >
            <div >
              <label htmlFor="code" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expiry Date:</label>
              <input type="number" name="month" id="month" className="shadow-sm inline-block w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:value-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  placeholder="8" max="12"/>
              <input type="number" name="year" id="year" className="shadow-sm inline-block w-20 ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600dark:placeholder-gray-400 dark:value-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"   placeholder="24"/>
            </div>
            <div className="ml-10">
              <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Security Code:</label>
              <input type="number" name="code" id="code" className=" w-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" min="100" max="999"   />
            </div>
          </div>
            
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
          </form>
      </main>
    )
  }