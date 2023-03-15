import React from "react"


const StockCards = ({stock}) => {

   

    return(
        <>
            <h1>{stock.ticker}</h1>
            <p>
                {stock.name}
            </p>
            <p>
                {stock.currency_name}
            </p>
            <p>
                {stock.locale}
            </p>
            <p>
                {stock.description}
            </p>
            
        </>
    )

}

export { StockCards }