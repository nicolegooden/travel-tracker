class Trip {
  constructor(tripData, myDestinationData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = myDestinationData.id;
    this.travelers = tripData.travelers;
    if (tripData.date instanceof Date) {
      this.date = tripData.date;
    } else {
      let [year, month, day] = tripData.date.split('/');
      this.date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }
    this.duration = tripData.duration;
    this.status = tripData.status || 'pending';
    this.suggestedActivities = tripData.suggestedActivities;
    this.myDestinationData = myDestinationData;
  }
  
  estimateTripCost() {
    let totalLodgingCost = this.duration * this.myDestinationData.estimatedLodgingCostPerDay;
    let totalFlightCost = this.travelers * this.myDestinationData.estimatedFlightCostPerPerson;
    let tripCost = totalLodgingCost + totalFlightCost;
    return ((tripCost * .10) + tripCost).toFixed(2);
  }
}

export default Trip;