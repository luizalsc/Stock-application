import moment from 'moment/moment'

// export const yesterday = moment(new Date(), 'DD-MM-YYYY').add(-1, 'days').format('YYYY-MM-DD')

export const yesterday = moment(new Date(), 'DD-MM-YYYY').add(-1, 'days')
export const formatedYesterdayDate = yesterday.format('YYYY-MM-DD')
export const dayOfTheWeek = moment(new Date(), 'DD-MM-YYYY').format('E')

console.log(formatedYesterdayDate, dayOfTheWeek)

function formatDate (dayOfTheWeek) {
  if (dayOfTheWeek === '7') {
    const day = moment(new Date(), 'DD-MM-YYYY').add(-2, 'days').format('YYYY-MM-DD')
    console.log(day)
    return (day)
  } else if (dayOfTheWeek === '1') {
    const day = moment(new Date(), 'DD-MM-YYYY').add(-3, 'days').format('YYYY-MM-DD')
    return (day)
  } else {
    const day = formatedYesterdayDate
    return (day)
  }
}

export { formatDate }

// function momentTest () {
//   const now = moment(new Date(), 'DD-MM-YYYY').format()
//   const yesterday = moment(new Date(), 'DD-MM-YYYY').add(-1, 'days').format('YYYY-MM-DD')
//   const dayOfTheWeek = moment(yesterday).format('E')
//   console.log('data do dia de hoje - ', now)
//   console.log('data de ontem - ', yesterday)
//   console.log('num do dia da semana - ', dayOfTheWeek)
// }

// momentTest()
