const dateTimeParser = (dateString: string) => {
  const date = new Date(dateString)

  let month: string = (date.getMonth() + 1).toString().padStart(2, '0')
  let day: string = date.getDate().toString().padStart(2, '0')
  let year: string = date.getFullYear().toString()
  let hour: number = date.getHours()
  let minute: number | string = date.getMinutes()
  const ampm = hour >= 12 ? 'PM' : 'AM'

  hour %= 12 // convert hours from 24-hr to 12-hr format
  hour = hour || 12 // handle midnight (0hours)

  minute = minute < 10 ? '0' + minute : minute // add leading zero to minutes if needed

  const formattedTime =
    hour + ':' + minute + ' ' + ampm + ' ' + `${month}/${day}/${year}`
  return formattedTime
}

export default dateTimeParser
