const currentDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }

  const today = new Date().toLocaleDateString('en-ca', options)
  return today
}

export default currentDate
