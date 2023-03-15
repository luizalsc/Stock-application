

async function getTickers(stockTickers) {
              
    const response = await fetch(`https://api.polygon.io/v3/reference/tickers/${stockTickers}?apiKey=insertKey`)

    return(await response.json())
}

export { getTickers }