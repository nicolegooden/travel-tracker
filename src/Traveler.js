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
    let tripStart;
    let tripDuration;
    let tripEnd;
    date = this.convertSingleDate(date);
    this.myTrips.forEach(trip => {
      tripStart = trip.date;
      tripDuration = trip.duration;
      tripEnd = time.daysFromDate(tripStart, tripDuration);
      if (!time.isBetween(tripStart, date, tripEnd) && time.isBefore(trip.date, date)) {
        this.pastTrips.push(trip)
      }
    })
    return this.pastTrips;
  }

  findPresentTrip(date, time) {
    let presentTrip;
    let tripStart;
    let tripDuration;
    let tripEnd;
    date = this.convertSingleDate(date);
    this.myTrips.forEach(trip => {
      tripStart = trip.date;
      tripDuration = trip.duration;
      tripEnd = time.daysFromDate(tripStart, tripDuration);
      if (time.isBetween(tripStart, date, tripEnd)) {
        presentTrip = trip;
      }
    })
    this.presentTrip = presentTrip;
    return this.presentTrip;
  }

  convertSingleDate(date) {
    let [year, month, day] = date.split('/');
    date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date;
  }
  //move these convert methods to scripts
  //because they are not the responsibility 
  //of the traveler!!!

  findUpcomingTrips(date, time) {
    let parsedDate = this.convertSingleDate(date);
    let upcomingTrips = this.myTrips.filter(trip => {
      return !time.isBefore(trip.date, parsedDate) && 
      !time.isEqual(trip.date, parsedDate);
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

  requestNewTrip(date, duration, travelers, destination, allDestinations, allTrips) {
    let tripData = {
      userID: this.id,
      travelers,
      date,
      duration,
      destination,
      status: 'pending',
      suggestedActivities: []
    }
    let requestedTrip = new Trip(tripData);
    requestedTrip.determineDestinationID(allDestinations);
    requestedTrip.getID(allTrips);
    delete requestedTrip.destination;
    // this.myTrips.push(requestedTrip);
    return requestedTrip;
  }

  calculateCostsThisYear(year, allDestinations) {
    let tripsThisYear = this.myTrips.filter(trip => {
      return trip.date.getUTCFullYear() === parseInt(year);
    })
    return tripsThisYear.reduce((acc, trip) => {
      let myDestinations = allDestinations.filter(destination => {
        return destination.id === trip.destinationID;
      })
      myDestinations.forEach(destination => {
        let totalLodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;
        let totalFlightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
        let combinedCost = totalLodgingCost + totalFlightCost;
        let combinedCostWithFee = combinedCost + (combinedCost * .10);
        acc += combinedCostWithFee;
      })
      return acc;
    }, 0)      
  }
}

export default Traveler;