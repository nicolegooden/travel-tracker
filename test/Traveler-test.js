import chai from 'chai';
const expect = chai.expect;
//const { expect } = require("chai");
import allTravelers from '../data/travelers.js'
import allTrips from '../data/trips.js'
import allDestinations from '../data/destinations.js';
import Traveler from '../src/Traveler.js';

describe('Traveler', () => {
  
  let traveler;
  let singleTraveler;

  beforeEach(() => {
    singleTraveler = allTravelers[0];
    traveler = new Traveler(singleTraveler);
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should take a single traveler\'s data as an argument', () => {
    expect(singleTraveler).to.deep.equal(allTravelers[0]);
    expect(traveler.myData).to.deep.equal(singleTraveler);
  });

  it('should have a unique id', () => {
    expect(traveler.id).to.equal(1);
  });

  it('should have a name', () => {
    expect(traveler.name).to.equal('Ham Leadbeater');
  })

  it('should have a traveler type', () => {
    expect(traveler.travelerType).to.equal('relaxer');
  });

  it('should have a record of its past trips', () => {
    expect(traveler.pastTrips).to.deep.equal([]);
  });

  it('should have a record of its present trips', () => {
    expect(traveler.presentTrips).to.deep.equal([]);
  });

  it('should have a record of its upcoming trips', () => {
    expect(traveler.upcomingTrips).to.deep.equal([]);
  });

  it('should have a record of its pending trips', () => {
    expect(traveler.pendingTrips).to.deep.equal([])
  });

//   it('should have a unique username for login', () => {
//     let username = 'traveler1';
//     expect(traveler.username).to.equal(username);
//   });

  it('should have a unique password for login', () => {
    expect(traveler.password).to.equal('travel2020');
    //this is a default for all travelers - can be hard coded in constructor
  });

  it('should determine its unique username for login', () => {
    expect(traveler.determineUsername()).to.equal('traveler1');
  });

  it('should be able to request a new trip', () => {
    traveler.requestNewTrip(trip)
    //what am I expecting here?
    //new trip object should be returned
  });

  it('should be able to calculate the overall cost of a trip', () => {
    let trip = allTrips[1];
    expect(traveler.calculateTripCost(trip)).to.equal()
  });
});