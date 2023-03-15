

async function getTickers(stockTickers) {
              
    const response = await fetch(`https://api.polygon.io/v3/reference/tickers/${stockTickers}?apiKey=Di9sCRa_Bj2l8cpNdcSXk4E3rpAp1aFP`)

    return(await response.json())
}

export { getTickers }