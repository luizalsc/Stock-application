import moment from 'moment/moment'

const yesterday = moment(new Date(), 'DD-MM-YYYY').add(-1, 'days')
const formatedYesterdayDate = yesterday.format('YYYY-MM-DD')
export const dayOfTheWeek = moment(new Date(), 'DD-MM-YYYY').format('E')

function formatDate (dayOfTheWeek) {
  const monday = '1'
  const sunday = '7'

  if (dayOfTheWeek === sunday) {
    const day = moment(new Date(), 'DD-MM-YYYY').add(-2, 'days').format('YYYY-MM-DD')
    console.log(day)
    return (day)
  } else if (dayOfTheWeek === monday) {
    const day = moment(new Date(), 'DD-MM-YYYY').add(-3, 'days').format('YYYY-MM-DD')
    return (day)
  } else {
    const day = formatedYesterdayDate
    return (day)
  }
}

export { formatDate }
