//---Separar lógica das datas desse arquivo (?)---
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

//---------------

//---Aprender a criar variável de ambiente---

async function getTickers(stockTickers) {


    const response = await fetch(`https://api.polygon.io/v3/reference/tickers/${stockTickers}?apiKey=Di9sCRa_Bj2l8cpNdcSXk4E3rpAp1aFP`)

    return(await response.json())
}

async function getTickerDetails(stockTickers) {

    const currentDay = formatCurrentDate(date, 'aaaa-mm-dd')
    const previousDay = formatPreviousDate(yesterdayDate, 'aaaa-mm-dd')


    const response = await fetch(`https://api.polygon.io/v1/open-close/${stockTickers}/${previousDay}?apiKey=Di9sCRa_Bj2l8cpNdcSXk4E3rpAp1aFP`)


    return (await response.json())
}

export { getTickers, getTickerDetails }

