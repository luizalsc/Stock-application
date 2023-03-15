import React from "react"
import { useSelector } from "react-redux"

const StockCards = () => {

    const cardStocks = useSelector(state => state.cardStocks.results)

        return(
            <>
                <section> 
                    <h1>{cardStocks.name}</h1>  
                    <h4>{cardStocks.ticker}</h4>
                </section>   
            </>
    )}
    

export { StockCards }
