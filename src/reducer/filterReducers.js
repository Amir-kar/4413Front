export const filterReducer=(state,action)=>{
    const {type,payload}=action;

    switch(type){
        case "PRODUCT_LIST":
            return{ productList:payload.products }
        case "SORT_BY":
            console.log("works Price2");
            return {...state,sortBy:payload.sortBy}
        case "RATINGS":
            return {...state,rating:payload.rating}
        case "ONLY_PORTO":
            return {...state,onlyPorto:payload.onlyPorto}
        case "USER_SORT_BY":
            console.log("works ID2");
            return{...state,sortBy:payload.sortBy}
        case "CLEAR_FILTER":
            return {...state, 
                onlyPorto:null,
                sortBy:null,
                userSortBy:null,
                rating:null
            }
        default:
            throw new Error("you did wrong");
    }
}