
const date = new Date()
const previousDate = date.setHours(-1)
const yesterdayDate = new Date(previousDate)

function formatCurrentDate(date, format){

    const currentMonth = date.getMonth() + 1
    const today = date.getDate()

    const map = {
        mm: `0${currentMonth}`.toString().slice(-2),
        dd: `0${today}`.toString().slice(-2),
        aaaa: date.getFullYear()
    }
    
    return (format.replace(/mm|dd|aaaa/gi, matched => map[matched]))
}

function formatPreviousDate(previousDate, format){

    const month = previousDate.getMonth() + 1
    const yesterday = previousDate.getDate() - 1

    const map = {
        mm: `0${month}`.toString().slice(-2),
        dd: `0${yesterday}`.toString().slice(-2),
        aaaa: date.getFullYear()
    }
    
    return (format.replace(/mm|dd|aaaa/gi, matched => map[matched]))
}

async function getTickers(stockTickers) {

    const response = await fetch(`https://api.polygon.io/v3/reference/tickers/${stockTickers}?apiKey=insertkey`)

              
    return(await response.json())
}


async function getTickerDetails(stockTickers) {

    const currentDay = formatCurrentDate(date, 'aaaa-mm-dd')
    const previousDay = formatPreviousDate(yesterdayDate, 'aaaa-mm-dd')

    const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${stockTickers}/range/1/day/${previousDay}/${currentDay}?apiKey=insertkey`)

    return (await response.json())


}

export { getTickers, getTickerDetails }

