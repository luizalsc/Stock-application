import React from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addStocksToPortifolio } from "../../../store/actions/stock-portifolio"

const StockCard = () => {

    const initialStock = {
        cardStocks: useSelector(state => state.cardStocks.results),
        stocksCLosePrice: useSelector(state => state.stockDetails)
    }
    console.log(initialStock.stocksCLosePrice)
    const dispatch = useDispatch()

    if(initialStock.cardStocks === undefined){

        return(
            <>
                <p>Pesquise uma sigla de ação</p>  
            </>
        )
    }
        return(
            <>
                <section> 
                    <h1>{initialStock.cardStocks.name}</h1>  
                    <h4>{initialStock.cardStocks.ticker}</h4>
                    <p>{initialStock.cardStocks.description}</p>
                    <div>
                        <h3>Preço da ação</h3>
                        <p>{initialStock.stocksCLosePrice.close}</p>
                    </div>
                    <button onClick={() => {dispatch(addStocksToPortifolio(initialStock))}}>Adicionar ação à minha carteira</button>
                    
                </section>   
            </>
    )}

export { StockCard }
