import chai from 'chai';
const expect = chai.expect;
//const { expect } = require("chai");
import time from '../src/time.js';
import allTravelers from '../data/travelers.js'
import allTrips from '../data/trips.js'
import allDestinations from '../data/destinations.js';
import Trip from '../src/Trip.js';
import Traveler from '../src/Traveler.js';

describe('Traveler', () => {
  
  let traveler;
  let singleTraveler;

  beforeEach(() => {
    singleTraveler = allTravelers[1];
    traveler = new Traveler(singleTraveler);   
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should take a single traveler\'s data as an argument', () => {
    expect(singleTraveler).to.deep.equal(allTravelers[1]);
    expect(traveler.myData).to.deep.equal(singleTraveler);
  });

  it('should have a unique id', () => {
    expect(traveler.id).to.equal(2);
  });

  it('should have a name', () => {
    expect(traveler.name).to.equal('Rachael Vaughten');
  })

  it('should have a traveler type', () => {
    expect(traveler.travelerType).to.equal('thrill-seeker');
  });

  it('should be able to find all trips', () => {
    const myTrips = [
      allTrips[1],
      allTrips[2],
      allTrips[3],
      allTrips[4],
      allTrips[5],
      allTrips[6]
    ]; 

    myTrips.forEach(trip => {
      let [year, month, day] = trip.date.split('/');
      trip.date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    })

    myTrips.forEach(trip => {
      trip.myDestinationData = allDestinations.find(destination => {
        return destination.id === trip.destinationID;
      })
    })

    expect(traveler.myTrips).to.deep.equal([]);
    expect(traveler.findAllTrips(allTrips, allDestinations)).to.deep.equal(myTrips);
    expect(traveler.myTrips).to.deep.equal(myTrips);
    expect(traveler.myTrips).to.be.an('array').that.does.not.include(allTrips[0]);
  });

  it('should determine which trips are past trips', () => {
    const pastTrips = [allTrips[1]];
    pastTrips.forEach(pastTrip => {
      pastTrip.myDestinationData = allDestinations[5];
    })
    traveler.findAllTrips(allTrips, allDestinations);
    expect(traveler.findPastTrips('2020/01/29', time)).to.deep.equal(pastTrips);
    expect(traveler.pastTrips).to.deep.equal(pastTrips);
  });

  it('should determine which trip is happening currently', () => {
    let presentTrip = allTrips[6];
    presentTrip.myDestinationData = allDestinations[6];
    traveler.findAllTrips(allTrips, allDestinations);
    expect(traveler.findPresentTrip('2020/02/01', time)).to.deep.equal(presentTrip);
    expect(traveler.presentTrip).to.deep.equal(presentTrip);
  });

  it('should determine which trips are upcoming trips', () => {
    let upcomingTrips = [allTrips[2], allTrips[3], allTrips[4], allTrips[5]];
    upcomingTrips = traveler.findAllTrips(upcomingTrips, allDestinations);
    expect(traveler.findUpcomingTrips('2020/01/29', time)).to.deep.equal(upcomingTrips);
    expect(traveler.upcomingTrips).to.deep.equal(upcomingTrips);
  });

  it('should determine which trips are pending trips', () => {
    const pendingTrips = [allTrips[5]];
    pendingTrips.forEach(trip => {
      trip.myDestinationData = allDestinations[7];
    })
    traveler.findAllTrips(allTrips, allDestinations);
    expect(traveler.findPendingTrips()).to.deep.equal(pendingTrips);
    expect(traveler.pendingTrips).to.deep.equal(pendingTrips);
  });

  it('should have a unique password for login', () => {
    expect(traveler.password).to.equal('travel2020');
    //this is a default for all travelers - can be hard coded in constructor
  });

  it('should determine its unique username for login', () => {
    expect(traveler.determineUsername()).to.equal('traveler2');
    expect(traveler.username).to.equal('traveler2')
  });

  it.skip('should be able to request a new trip', () => {
    let date = '2020/10/26';
    // date = traveler.convertSingleDate(date);
    const duration = 4;
    const travelers = 3;
    const destination = 'Stockholm, Sweden';

    const trip = {
      "id": 178, 
      "userID": 2, 
      "destinationID": 2, 
      "travelers": 3, 
      "date": traveler.convertSingleDate(date), 
      "duration": 4, 
      "status": "pending", 
      "suggestedActivities": []
    }
    expect(traveler.requestNewTrip(date, duration, travelers, destination, allDestinations, allTrips)).to.deep.equal(trip);
    expect(traveler.requestNewTrip(date, duration, travelers, destination, allDestinations, allTrips)).to.be.an.instanceOf(Trip);
  });

  it('should be able to calculate the total cost of trips this year', () => {
    traveler.myTrips = [allTrips[1], allTrips[2], allTrips[3], allTrips[4], allTrips[5], allTrips[6]];
    expect(traveler.calculateCostsThisYear('2020', allDestinations)).to.equal(24550.9);
  });
});