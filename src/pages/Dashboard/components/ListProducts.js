import { Link } from "react-router-dom"

export const ListProducts=({order,handleDelete})=>{
    return(
        <>
        { order.cartList.map((product)=>(
            <div key={product.id} className="flex flex-wrap justify-between max-w-4xl m-auto p-2 my-5 ">
                <div className="flex">
                    <Link to={`/products/${product.id}`}>
                        <img className="w-32 rounded" src={product.poster} alt={product.name} />
                    </Link>
                    <div className="">
                        <Link to={`/products/${product.id}`}>
                            <p className="text-lg ml-2 dark:text-slate-200">
                                {product.name}
                                
            
                            </p>
                            
                        </Link>
                        <div className="text-lg m-2 dark:text-slate-200">
                            <span>${product.price}</span>
                        </div>
                    </div>
                </div>
                {product.isPorto && <span className="float-right font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2 h-9 ">BEST SELLER</span>}
                {!product.isPorto && <span className="float-right font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2 h-9 ">not BEST SELLER</span>}
            
            </div>
          ))}
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>handleDelete(order.id)}>
            Cancel Order
          </button>
        </>
    )
}