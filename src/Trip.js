class Trip {
  constructor(tripData, myDestinationData) {
    this.duration = tripData.duration;
    this.travelers = tripData.travelers;
    this.myDestinationData = myDestinationData;
    this.destinationID = myDestinationData.id;
    this.userID = tripData.userID;
    this.status = tripData.status || 'pending';
    this.id = tripData.id;
    this.suggestedActivities = tripData.suggestedActivities;
    if (tripData.date instanceof Date) {
      this.date = tripData.date;
    } else {
      let [year, month, day] = tripData.date.split('/');
      this.date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }
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

  // findDestinationInfo(allDestinations) {
  //   if (!this.destinationID) {
  //     return allDestinations.find(destination => {
  //       return destination.destination === this.destination;
  //     })
  //   } else {
  //     return allDestinations.find(destination => {
  //       return destination.id === this.destinationID;
  //     })
  //   }
  // }
  
  estimateTripCost() {
    let totalLodgingCost = this.duration * this.myDestinationData.estimatedLodgingCostPerDay;
    let totalFlightCost = this.travelers * this.myDestinationData.estimatedFlightCostPerPerson;
    let tripCost = totalLodgingCost + totalFlightCost;
    return ((tripCost * .10) + tripCost);
  }
}

export default Trip;