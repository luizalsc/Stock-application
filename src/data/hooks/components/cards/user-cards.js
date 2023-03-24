import React from "react"
import { deleteSotck } from "../../../store/actions/remove-stock"
import { useDispatch, useSelector } from "react-redux"

const StocksPortifolio = () => {

    const userStocks = useSelector(state => state.userStocks)

    const dispatch = useDispatch()
        
        return(
            <>
                <h1>Carteira de Ações</h1>
                <ul>
                    {userStocks.length > 0 ? (
                        userStocks.map((stock, index) => (
                        <li key={index} name={stock.name} >
                            <h3>{stock.cardStocks.name}</h3>
                            <p>{stock.cardStocks.ticker} - {stock.cardStocks.sic_description}</p>
                            <p>{stock.stocksCLosePrice.close}</p>
                            <button onClick={()=>{dispatch(deleteSotck(index))}}>Remover ação</button>
                        </li>
                    ))
                    ) : (
                        <li>Nenhum produto encontrado</li>
                    )}
                </ul>
            </>
    )}
    

export { StocksPortifolio }
