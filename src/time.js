let time = {
  daysFromDate(date, days) {
    let millisecondsFromThen = days * 24 * 60 * 60 * 1000;
    return new Date(date.getTime() + millisecondsFromThen)
  },
  
  isBetween(beg, test, end) {
    return beg.getTime() <= test.getTime() && test.getTime() <= end.getTime();
  },

  isBefore(test, reference) {
    return test.getTime() < reference.getTime()
  },

  isEqual(test, reference) {
    return test.getTime() === reference.getTime();
  }
} 

export default time;