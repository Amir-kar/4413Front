import { createContext, useContext, useReducer } from "react"
import { filterReducer } from "../reducer";

const filterInitialState={
    productList:[],
    sortBy:null,
    userSortBy:null,
    rating:null
}


const FilterContext=createContext(filterInitialState);

export const FilterProviderDash=({children})=>{
    const [state,dispatch]=useReducer(filterReducer,filterInitialState);

    function initialProductList(products){
        dispatch({
            type:"PRODUCT_LIST",
            payload:{
                products:products
            }
        })
    }

    
    function sort(products){
        console.log("works price");
        console.log(state.sortBy);
        if(state.sortBy==="Plowtohigh"){
            
            return products.sort((a,b)=>Number(a.amount_paid)-Number(b.amount_paid));
        }
        if(state.sortBy==="Phightolow"){
            return products.sort((a,b)=>Number(b.amount_paid)-Number(a.amount_paid));

        }
        return products;
    }
    function userSortBy(products){
        console.log("works ID");
        if(state.sortBy==="Ilowtohigh"){
            return products.sort((a,b)=>Number(a.user.id)-Number(b.user.id));
        }
        if(state.sortBy==="Ihightolow"){
            return products.sort((a,b)=>Number(b.user.id)-Number(a.user.id));

        }
        return products;
    }

    
    function clearFilter(product){

        return product.sort((a,b)=>Number(a.id)-Number(b.id));
    }
    
    const filtererdProductList= sort(userSortBy(clearFilter(state.productList)));
    const value={
        state,
        dispatch,
        productList:filtererdProductList,
        initialProductList
    }
    return(
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}
export const useFilterDash=()=>{
    const context=useContext(FilterContext)
    return context;
};