import React from "react"
import { useSelector } from "react-redux"

const StocksPortifolio = () => {

    const userStocks = useSelector(state => state.userStocks)

        return(
            <>
                <h1>Carteira de Ações</h1>
                <ul>
                    {userStocks.length > 0 ? (
                        userStocks.map((stock, index) => (
                        <li key={index}>
                            <p>{stock.name}</p>
                        </li>
                    ))
                    ) : (
                        <li>Nenhum produto encontrado</li>
                    )}
                </ul>
            </>
    )}
    

export { StocksPortifolio }
