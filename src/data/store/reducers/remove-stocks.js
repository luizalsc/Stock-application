export default function reducer(state = state.userStocks, action){
    
        if(action.type === 'ATT_PORTILFOLIO'){

            const nome = state.indexOf(action.payload)
    
            const extracted = state.splice(nome, 1)

            console.log(extracted)
    
            return [state.filter( stock1 => !extracted.filter( stock2 => stock1 !== stock2).length)]
        }

    return state
}