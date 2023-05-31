import { formatDate, dayOfTheWeek } from './utils'

async function getTickers (stockTickers) {
  const response = await fetch(process.env.REACT_APP_POLYGON_API_URL + `v3/reference/tickers/${stockTickers}?apiKey=` + process.env.REACT_APP_API_KEY)

  return (await response.json())
}

async function getTickerDetails (stockTickers) {
  const previousDay = formatDate(dayOfTheWeek)

  const response = await fetch(process.env.REACT_APP_POLYGON_API_URL + `v1/open-close/${stockTickers}/${previousDay}?apiKey=` + process.env.REACT_APP_API_KEY)

  return (await response.json())
}

export { getTickers, getTickerDetails }
