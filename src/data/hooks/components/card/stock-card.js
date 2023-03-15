import React from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addStocksToPortifolio } from "../../../store/actions/stock-portifolio"

const StockCard = () => {

    const cardStocks = useSelector(state => state.cardStocks.results)

    const dispatch = useDispatch()

        return(
            <>
                <section> 
                    <h1>{cardStocks.name}</h1>  
                    <h4>{cardStocks.ticker}</h4>
                    <p>{cardStocks.description}</p>
                    <button onClick={() => {dispatch(addStocksToPortifolio(cardStocks))}}>Adicionar ação à minha carteira</button>
                </section>   
            </>
    )}
    

export { StockCard }
