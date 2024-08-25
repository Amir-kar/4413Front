import { useState } from "react";
import { Wallet } from "./Wallet";

export const UserCard=({handleChange,updateUser,user})=>{
    
    const [change, setChange] = useState(false);
    return(
        <section>
                <div className="mt-5   right-0 left-0 w-full   justify-center items-center flex" >
                    <div className=" p-4 w-full max-w-md   ">
                        <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="py-6 px-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                    <i className="bi bi-credit-card mr-2"></i>User Information
                                </h3>
                                <form onSubmit={updateUser} className="space-y-6" >
                                    <div>
                                        <label htmlFor="name" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
                                        <input type="text" name="name" id="name" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white  ${change ? "" : "cursor-not-allowed"}`} onChange={e=>handleChange({name:e.target.value})} value={user.name || ""} disabled={change ? "" : "disabled"} />
                                    </div>
                                    {<Wallet wallet={user.wallet} change={change} handleChange={handleChange} />}

                                    <div>
                                        <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setChange(!change)} />
                                        <label htmlFor="code" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Modify User Information</label>
                                    </div>
                                    <button type="submit" className={`w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ${change ? "" : "cursor-not-allowed"}`} disabled={change ? "" : "disabled"} >
                                        Change Information
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}