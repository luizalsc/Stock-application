// ---Separar lógica das datas desse arquivo (?)---
const previousDate = new Date().setHours(-1)
const yesterdayDate = new Date(previousDate)
let day = yesterdayDate.getDate()

function formatPreviousDate (previousDate, format) {
  if (previousDate.getDay() === 0) {
    day = previousDate.getDate() - 2
  } else if (previousDate.getDay() === 6) {
    day = previousDate.getDate() - 1
  }
  const month = previousDate.getMonth() + 1
  const map = {
    mm: `0${month}`.toString().slice(-2),
    dd: `0${day}`.toString().slice(-2),
    aaaa: previousDate.getFullYear()
  }
  return (format.replace(/mm|dd|aaaa/gi, (matched) => map[matched]))
}

// ---Aprender a criar variável de ambiente---

async function getTickers (stockTickers) {
  const response = await fetch(`https://api.polygon.io/v3/reference/tickers/${stockTickers}?apiKey=YOUR_API_KEY`)

  return (await response.json())
}

async function getTickerDetails (stockTickers) {
  const previousDay = formatPreviousDate(yesterdayDate, 'aaaa-mm-dd')

  const response = await fetch(`https://api.polygon.io/v1/open-close/${stockTickers}/${previousDay}?apiKey=YOUR_API_KEY`)

  return (await response.json())
}

export { getTickers, getTickerDetails }
