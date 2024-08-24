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
    function ifPorto(product,type){
        
        console.log("ksjhdjkghsk");
        for(let i=0;i<product.cartList.length;i++){
            console.log("in array at: "+i);
            console.log(product.cartList[i]);
            if(product.cartList[i].best_seller===type){

                return true;
            }
                
        }
        return false;
    }

    function onlyPorto(products){
        if(state.onlyPorto==="Porto"){
            return products.filter(product=>ifPorto(product,true));
        }
        if(state.onlyPorto==="Leash"){
            return products.filter(products=>ifPorto(products,false));
        }
        return products;
    }

    
    function sort(products){
        if(state.sortBy==="Plowtohigh"){
            
            return products.sort((a,b)=>Number(a.amount_paid)-Number(b.amount_paid));
        }
        if(state.sortBy==="Phightolow"){
            return products.sort((a,b)=>Number(b.amount_paid)-Number(a.amount_paid));

        }
        return products;
    }
    function userSortBy(products){

        console.log(products);
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
    
    const filtererdProductList= sort(userSortBy(onlyPorto(clearFilter(state.productList))));
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