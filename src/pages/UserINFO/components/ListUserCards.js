import { useEffect, useState } from "react"
import { DropdownSVG } from "../../../assets";
import { UserCard } from "./UserCard";
import { toast } from "react-toastify";
import { patch } from "../../../services";

export const ListUserCards=({user})=>{
    const [dropList,setDropList]=useState(false);
    const [fakeUser,setFakeUser]=useState({});

    useEffect(()=>{
        if(!dropList){
            setFakeUser(user);
        }
    },[dropList,fakeUser])
    function handleChange({
        name = fakeUser.name,
        card = fakeUser?.card,
        month = fakeUser?.wallet?.month,
        year = fakeUser?.wallet?.year,
        cvv = fakeUser?.wallet?.cvv }) {

        const data = {
            id: user.id,
            name: name,
            wallet: {
                card: card,
                month: month,
                year: year,
                cvv: cvv
            }
        }
        setFakeUser(data);
    }
    async function updateUser(event) {
        event.preventDefault();
        try{
            await patch(fakeUser);
            toast.success("User Inforation changed");
        }catch(error){
            toast.error(error.message);
        }
    }
    return(
        <div className="max-w-4xl m-auto p-2 mb-5 border dark:border-slate-700">
          <div className="flex justify-between text-sm m-2 font-bold dark:text-slate-200">
              <span>User Id: {fakeUser.id}</span>
              <span>User Name: ${fakeUser.name}</span>
              <button onClick={()=>setDropList(!dropList)}><DropdownSVG/></button>
          </div>
          
          {dropList&&<UserCard handleChange={handleChange} updateUser={updateUser} user={fakeUser} />}

          
          
      </div>
    )
}