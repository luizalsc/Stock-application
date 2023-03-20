//---Necessário??

export default function reducer(state = [], action){
    
    if(action.type === 'ADD_DELETED_STOCK'){
        return [...state, action.payload]
    }
    
return state
}