import React from "react"
import { deleteSotck } from "../../../store/actions/remove-stock"
import { useDispatch, useSelector } from "react-redux"
import { StockDetails } from "../card/stock-card"


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
                            <h3>{stock.name}</h3>
                            <p>{stock.ticker} - {stock.sic_description}</p>
                            <StockDetails/>
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
