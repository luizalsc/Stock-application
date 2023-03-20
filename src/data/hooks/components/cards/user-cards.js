//---Ajeitar imports---

import React from "react"
import { deleteSotck } from "../../../store/actions/remove-stock"
import { useDispatch, useSelector } from "react-redux"
import { attPortifolio } from "../../../store/actions/att-portifolio"

const StocksPortifolio = () => {

    const userStocks = useSelector(state => state.userStocks)
        
        return(
            <>
                <h1>Carteira de Ações</h1>
                <ul>
                    {userStocks.length > 0 ? (
                        userStocks.map((stock, index) => (
                        <li key={index} name={stock.name}>
                            <p>{stock.name}</p>
                            <UnwantedStocks stock={stock}/>
                        </li>
                    ))
                    ) : (
                        <li>Nenhum produto encontrado</li>
                    )}
                </ul>
            </>
    )}
    

export { StocksPortifolio }

//---Separar componentes---


//---Componente necessário??---
const UnwantedStocks = (stock, userStocks) => {


    const handleClick = () => {

        const nome = userStocks.indexOf(stock)
    
        const extracted = userStocks.splice(nome, 1)

        console.log(extracted)
    
        return (

            userStocks = userStocks.filter( stock1 => !extracted.filter( stock2 => stock1 !== stock2).length)
            
            )
    }

    return(
        <button onClick={handleClick}>Remover ação</button>
    )

}