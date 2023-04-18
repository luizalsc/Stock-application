import React from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addStocksToPortifolio } from "../../../store/actions/stock-portifolio"

const StockCard = () => {

    const initialStock = {
        cardStocks: useSelector(state => state.cardStocks.results),
        stocksCLosePrice: useSelector(state => state.stockDetails)
    }
    const userStocks = useSelector(state => state.userStocks)
    const dispatch = useDispatch()

    const handleClick = (event)=>{
        const value = event.target.value
        const repeatedSotcks = userStocks.filter(item => item.cardStocks.ticker === value)
        if(repeatedSotcks.length > 0){
            alert(`Você já adicionou ${value} à sua carteira. Cada ação só pode ser adicionada uma única vez`)
            return
        }
        dispatch(addStocksToPortifolio(initialStock))
    }

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
                    <button onClick={handleClick} value={initialStock.cardStocks.ticker}>Adicionar ação à minha carteira</button>
                    
                </section>   
            </>
    )}

export { StockCard }
