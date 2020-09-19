class Trip {
  constructor(date, duration, travelers, destination, userID) {
    this.date = date;
    this.duration = duration;
    this.travelers = travelers;
    this.destination = destination;
    this.userID = userID;
    this.status = 'pending';
  }

  getID(allTrips) {
    let tripIDList = allTrips.filter(trip => {
      return trip.id;
    })
    tripIDList.sort((a, b) => {
      return b.id - a.id;
    });
    this.id = tripIDList[0].id + 1
    return this.id;
  }

  determineDestinationID(allDestinations) {
    this.destinationID = this.findDestinationInfo(allDestinations).id;
    return this.destinationID;
  }

  findDestinationInfo(allDestinations) {
    const correctDest = allDestinations.find(destination => {
      return destination.destination === this.destination;
    })
    return correctDest;
  }

  estimateTripCost(allDestinations) {
    let destinationInfo = this.findDestinationInfo(allDestinations);
    let totalLodgingCost = this.duration * destinationInfo.estimatedLodgingCostPerDay;
    let totalFlightCost = this.travelers * destinationInfo.estimatedFlightCostPerPerson;
    let tripCost = totalLodgingCost + totalFlightCost;
    return ((tripCost * .10) + tripCost);
  }
}

export default Trip;