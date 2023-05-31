const previousDate = new Date().setHours(-1)
export const yesterdayDate = new Date(previousDate)
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

export { formatPreviousDate }
