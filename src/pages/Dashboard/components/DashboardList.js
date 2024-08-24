import { DropdownSVG } from "../../../assets/svg/DropdownSVG"
import { useState } from "react"
import { ListProducts } from "./ListProducts";

export const DashbaordList = ({order}) => {
    const[dropList,setDropList]=useState(false);
    
    return (
        <>
        
      <div className="max-w-4xl m-auto p-2 mb-5 border dark:border-slate-700">
          <div className="flex justify-between text-sm m-2 font-bold dark:text-slate-200">
              <span>Order Id: {order.id}</span>
              <span>Total: ${order.amount_paid}</span>
              <button onClick={()=>setDropList(!dropList)}><DropdownSVG/></button>
          </div>
          {dropList&&<ListProducts order={order}/>}

          
          
      </div>
      </>
    )
  }