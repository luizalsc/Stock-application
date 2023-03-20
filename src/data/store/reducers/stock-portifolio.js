export default function reducer(state = [], action){
   
    switch(action.type){
        case 'ADD_STOCK_TO_PORTIFOLIO':{
            return [...state, action.payload]}
        case 'ADD_DELETED_STOCK':{
            return[...state.filter((stock, index) => index !== action.payload)]
        }
    }

    return state
}
