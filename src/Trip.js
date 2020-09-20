class Trip {
  constructor(tripData) {
    this.duration = tripData.duration;
    this.travelers = tripData.travelers;
    this.destination = tripData.destination;
    this.destinationID = tripData.destinationID;
    this.userID = tripData.userID || userID;
    this.status = tripData.status || 'pending';
    let [year, month, day] = tripData.date.split('/');
    this.date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    this.id = tripData.id
    this.suggestedActivities = tripData.suggestedActivities;
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
    if (!this.destinationID) {
      return allDestinations.find(destination => {
        return destination.destination === this.destination;
      })
    } else {
      return allDestinations.find(destination => {
        return destination.id === this.destinationID;
      })
    }
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