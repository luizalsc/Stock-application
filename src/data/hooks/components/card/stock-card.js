import React from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { addStocksToPortifolio } from "../../../store/actions/stock-portifolio"

const StockCard = () => {

    const cardStocks = useSelector(state => state.cardStocks.results)

    const dispatch = useDispatch()

    if(cardStocks == undefined){

        return(
            <>
                <p>Pesquise uma sigla de ação</p>  
            </>
        )
    }
    

        return(
            <>
                <section> 
                    <h1>{cardStocks.name}</h1>  
                    <h4>{cardStocks.ticker}</h4>
                    <p>{cardStocks.description}</p>
                    <StockDetails/>
                    <button onClick={() => {dispatch(addStocksToPortifolio(cardStocks))}}>Adicionar ação à minha carteira</button>
                </section>   
            </>
    )}

const StockDetails = () => {

    const stockDetails = useSelector(state => state.stockDetails.results)

    return(
        <>
            <div>
                <h3>Preço de abertura do dia anterior</h3>
                <p>{stockDetails[0].o}</p>
                <h3>Média ponderada do dia anterior</h3>
                <p>{stockDetails[0].vw}</p>
            </div>
            <div>
                <h3>Preço de abertura atual</h3>
                <p>{stockDetails[1].o}</p>
                <h3>Média ponderada atual</h3>
                <p>{stockDetails[1].vw}</p>
            </div>
        </>
    )
}
    

export { StockCard, StockDetails }
