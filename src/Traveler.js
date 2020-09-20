class Traveler {
  constructor(myData) {
    this.myData = myData;
    this.id = myData.id;
    this.name = myData.name;
    this.travelerType = myData.travelerType;
    this.myTrips = [];
    this.pastTrips = [];
    this.presentTrip;
  }

  findAllTrips(allTrips) {
    const myTrips = allTrips.filter(trip => {
      return trip.userID === this.id;
    });
    myTrips.forEach(trip => {
      this.myTrips.push(trip)
    })
    return myTrips;
  }

  convertTripDates(allTrips) {
    let myTrips = this.findAllTrips(allTrips);
    myTrips.forEach(trip => {
      let [year, month, day] = trip.date.split('/');
      trip.date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      this.myTrips = myTrips;
    })
  }

  findPastTrips(date, time) {
    let pastTrips = this.myTrips.filter(trip => {
      return time.isBefore(trip.date, date);
    })
    pastTrips.forEach(pastTrip => {
      this.pastTrips.push(pastTrip);
    })
    return this.pastTrips;
  }

  findPresentTrip(date, time) {
    let presentTrip;
    let tripStart;
    let tripDuration;
    let tripEnd;
    this.myTrips.forEach(trip => {
      tripStart = trip.date;
      tripDuration = trip.duration;
      tripEnd = time.daysFromDate(tripStart, tripDuration);
      if (time.isBetween(tripStart, date, tripEnd)) {
        presentTrip = trip;
      }
    })
    console.log('this is present trip', presentTrip)
    this.presentTrip = presentTrip;
    return this.presentTrip;
  }
}

export default Traveler;