import chai from 'chai';
const expect = chai.expect;
//const { expect } = require("chai");
import allTravelers from '../data/travelers.js'
import allTrips from '../data/trips.js'
import allDestinations from '../data/destinations.js';
import Trip from '../src/Trip.js';

describe('Trip', () => {

  let date;
  let duration;
  let destination;
  let numberOfTravelers;
  let travelerID;
  let trip;

  beforeEach(() => {
    date = '2020/12/25';
    duration = 5;
    destination = 'Toronto, Canada';
    numberOfTravelers = 6;
    travelerID = 2;
    trip = new Trip(date, duration, numberOfTravelers, destination, travelerID);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  })

  it('should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceOf(Trip);
  });

  it('should take a date', () => {
    expect(trip.date).to.equal(date);
  });

  it('should take a duration', () => {
    expect(trip.duration).to.equal(duration);
  });

  it('should take a number of travelers', () => {
    expect(trip.travelers).to.equal(numberOfTravelers);
  });

  it('should take a destination', () => {
    expect(trip.destination).to.equal(destination);
  });

  it('should be able to have a unique id', () => {
    expect(trip.getID(allTrips)).to.equal(178)
    expect(trip.id).to.equal(178);
  });

  it('should have a userID', () => {
    expect(trip.userID).to.equal(travelerID);
  });

  it('should determine the destinationID of the destination', () => {
    expect(trip.determineDestinationID(allDestinations)).to.equal(10);
    expect(trip.destinationID).to.equal(10);
  });

  it('should have a pending status by default, if new trip', () => {
    expect(trip.status).to.equal('pending');
  });

  it.skip('should update status from pending to approved', () => {
    //not sure if I will need this test, this seems to be
    //a responsibility of the travel agent (not part of reqs)
    expect(trip.updateStatus()).to.equal('approved');
    expect(trip.status).to.equal('approved');
  });

  it('should be able to find the correct destination object', () => {
    expect(trip.findDestinationInfo(allDestinations)).to.deep.equal(allDestinations[5]);
  });

  it('should be able to calculate its estimated cost', () => {
    let estimatedLodgingCostPerDay = 90;
    let estimatedFlightCostPerPerson = 450;

    const estimateTripCost = () => {
      let totalLodgingCost = duration * estimatedLodgingCostPerDay;
      //duration = trip.duration
      //trip.destination.estimatedLodgingCostPerDay
      let totalFlightCost = numberOfTravelers * estimatedFlightCostPerPerson;
      //numberOfTravelers = trip.travelers
      //trip.destination.estimatedFlightCostPerPerson
      let tripCost = totalLodgingCost + totalFlightCost;
      return ((tripCost * .10) + tripCost);
    };

    expect(trip.estimateTripCost(allDestinations)).to.equal(estimateTripCost());
  });
});