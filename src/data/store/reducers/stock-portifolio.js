export default function reducer(state = [], action){
    if(action.type === 'ADD_STOCK_TO_PORTIFOLIO'){
        return [...state, action.payload]
    }

    return state
}