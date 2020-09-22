import Trip from '../src/Trip.js';

class Traveler {
  constructor(myData) {
    this.myData = myData;
    this.id = myData.id;
    this.name = myData.name;
    this.travelerType = myData.travelerType;
    this.myTrips = [];
    this.pastTrips = [];
    this.presentTrip;
    this.upcomingTrips = [];
    this.pendingTrips = [];
    this.password = 'travel2020';
  }

  findAllTrips(allTrips, allDestinations) {
    const myTrips = allTrips.filter(trip => {
      return trip.userID === this.id;
    });
    let myDestinationData;
    myTrips.forEach(trip => {
      allDestinations.forEach(destination => {
        if (trip.destinationID === destination.id) {
          myDestinationData = destination;
          this.myTrips.push(new Trip(trip, myDestinationData));
        }
      })
    })
    return this.myTrips;
  }

  sortMyTrips(date, time) {
    this.findPastTrips(date, time);
    this.findPresentTrip(date, time);
    this.findUpcomingTrips(date, time);
    this.findPendingTrips();
  }

  findPastTrips(date, time) {
    this.myTrips.forEach(trip => {
      let tripStart = trip.date;
      let tripDuration = trip.duration;
      let tripEnd = time.daysFromDate(tripStart, tripDuration);
      if (!time.isBetween(tripStart, date, tripEnd) && time.isBefore(trip.date, date)) {
        this.pastTrips.push(trip)
      }
    })
    return this.pastTrips;
  }

  findPresentTrip(date, time) {
    let presentTrip;
    this.myTrips.forEach(trip => {
      let tripStart = trip.date;
      let tripDuration = trip.duration;
      let tripEnd = time.daysFromDate(tripStart, tripDuration);
      if (time.isBetween(tripStart, date, tripEnd)) {
        presentTrip = trip;
      }
    })
    this.presentTrip = presentTrip;
    return this.presentTrip;
  }

  findUpcomingTrips(date, time) {
    // let parsedDate = this.convertSingleDate(date);
    let upcomingTrips = this.myTrips.filter(trip => {
      return !time.isBefore(trip.date, date) && 
      !time.isEqual(trip.date, date);
    })
    upcomingTrips.forEach(upcomTrip => {
      this.upcomingTrips.push(upcomTrip);
    })
    return this.upcomingTrips;
  }

  findPendingTrips() {
    let pendingTrips = this.myTrips.filter(trip => {
      return trip.status === 'pending';
    })
    pendingTrips.forEach(trip => {
      this.pendingTrips.push(trip)
    })
    return this.pendingTrips;
  }

  determineUsername() {
    this.username = `traveler${this.id}`;
    return this.username;
  }

  calculateCostsThisYear(year) {
    let tripsThisYear = this.myTrips.filter(trip => {
      return trip.date.getUTCFullYear() === parseInt(year);
    })
    return tripsThisYear.reduce((yearCost, trip) => {
      yearCost += trip.estimateTripCost();
      return yearCost;
    }, 0)      
  }
}

export default Traveler;
