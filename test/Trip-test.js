import chai from 'chai';
const expect = chai.expect;
import allTrips from '../data/trips.js'
import Trip from '../src/Trip.js';

describe('Trip', () => {

  let tripData;
  let parsedDate;
  let myDestinationData;
  let trip;

  beforeEach(() => {
    tripData = { 
      "destinationID": 10, 
      "userID": 2,
      "travelers": 6, 
      "date": "2020/12/25", 
      "duration": 5, 
      "status": "approved", 
      "suggestedActivities": []
    };

    myDestinationData = {
      "id":10,
      "destination":"Toronto, Canada",
      "estimatedLodgingCostPerDay":90,
      "estimatedFlightCostPerPerson":450,
      "image":"https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
    }

    let [year, month, day] = tripData.date.split('/');
    parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    trip = new Trip(tripData, myDestinationData);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  })

  it('should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it('should take a date', () => {
    expect(trip.date).to.deep.equal(parsedDate);
  });

  it('should have a duration', () => {
    expect(trip.duration).to.equal(tripData.duration);
  });

  it('should have a number of travelers', () => {
    expect(trip.travelers).to.equal(tripData.travelers);
  });

  it('should have its destination data', () => {
    expect(trip.myDestinationData).to.equal(myDestinationData);
  });

  it('should be able to have a unique id', () => {
    expect(trip.getID(allTrips)).to.equal(178)
    expect(trip.id).to.equal(178);
  });

  it('should have a userID', () => {
    expect(trip.userID).to.equal(tripData.userID);
  });

  it('should have its destination id', () => {
    expect(trip.destinationID).to.equal(10);
  });

  it('should have a status', () => {
    expect(trip.status).to.equal('approved');
  });

  it('should be able to calculate its estimated cost', () => {
    let estimatedLodgingCostPerDay = 90;
    let estimatedFlightCostPerPerson = 450;

    const estimateTripCost = () => {
      let totalLodgingCost = tripData.duration * estimatedLodgingCostPerDay;
      let totalFlightCost = tripData.travelers * estimatedFlightCostPerPerson;
      let tripCost = totalLodgingCost + totalFlightCost;
      return ((tripCost * .10) + tripCost).toFixed(2);
    };

    expect(trip.estimateTripCost()).to.equal(estimateTripCost());
  });
});