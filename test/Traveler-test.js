import chai from 'chai';
const expect = chai.expect;
//const { expect } = require("chai");
import allTravelers from '../data/travelers.js'
import allTrips from '../data/trips.js'
import allDestinations from '../data/destinations.js';
import Trip from '../src/Trip.js';
import Traveler from '../src/Traveler.js';

describe('Traveler', () => {
  
  let traveler;
  let singleTraveler;
  let time;

  beforeEach(() => {
    singleTraveler = allTravelers[1];
    traveler = new Traveler(singleTraveler);

    time = {
      daysFromDate(date, days) {
        let millisecondsFromThen = days * 24 * 60 * 60 * 1000;
        return new Date(date.getTime() + millisecondsFromThen)
      },
    
      isBetween(beg, test, end) {
        return beg.getTime() <= test.getTime() && test.getTime() <= end.getTime();
      },

      isBefore(test, reference) {
        return test.getTime() < reference.getTime()
      }
    }    
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

    expect(traveler.myTrips).to.deep.equal([]);
    expect(traveler.findAllTrips(allTrips)).to.deep.equal(myTrips);
    expect(traveler.myTrips).to.deep.equal(myTrips);
    expect(traveler.myTrips).to.be.an('array').that.does.not.include(allTrips[0]);
  });

  it('should determine which trips are past trips', () => {
    const pastTrips = [allTrips[1]];
    let theTrips = traveler.findAllTrips(allTrips);
    traveler.convertTripDates(theTrips);
    let dateOfTrip = theTrips[5].date;
    //will I need to convert dates in general?
    expect(traveler.findPastTrips(dateOfTrip, time)).to.deep.equal(pastTrips);
    expect(traveler.pastTrips).to.deep.equal(pastTrips);
  });

  it('should determine which trip is happening currently', () => {
    const presentTrip = allTrips[6];
    let theTrips = traveler.findAllTrips(allTrips);
    let dateOfTrip = theTrips[5].date;
    expect(traveler.findPresentTrip(dateOfTrip, time)).to.deep.equal(presentTrip);
    expect(traveler.presentTrip).to.deep.equal(presentTrip);
  });

  it('should determine which trips are upcoming trips', () => {
    const upcomingTrips = [allTrips[1], allTrips[2], allTrips[3]];
    expect(traveler.findUpcomingTrips('2020/01/29')).to.deep.equal(upcomingTrips);
    expect(traveler.upcomingTrips).to.deep.equal([upcomingTrips]);
  });

  it.skip('should determine which trips are pending trips', () => {
    const pendingTrips = [allTrips[4]];
    expect(traveler.findPendingTrips('2020/01/29')).to.deep.equal(pendingTrips);
    expect(traveler.pendingTrips).to.deep.equal(pendingTrips);
  });

  it.skip('should have a unique password for login', () => {
    expect(traveler.password).to.equal('travel2020');
    //this is a default for all travelers - can be hard coded in constructor
  });

  it.skip('should determine its unique username for login', () => {
    expect(traveler.determineUsername()).to.equal('traveler1');
  });

  it.skip('should be able to request a new trip', () => {
    const date = '2020/10/26';
    const duration = 4;
    const numberOfTravelers = 2;
    const destination = 'Stockholm, Sweden';

    const trip = {
      "id": 178, 
      "userID": 2, 
      "destinationID": 2, 
      "travelers": 2, 
      "date": "2020/10/26", 
      "duration": 4, 
      "status": "pending", 
      "suggestedActivities": []
    }
    expect(traveler.requestNewTrip(date, duration, numberOfTravelers, destination)).to.deep.equal(trip);
    //new id for trip (check that trips.id does not exist in allTrips)
    // ^ set id for added trip to the id of the last trip element plus 1 - always sequentially ordered
    //and new userID === matches the user who made the request
    //status always begins as 'pending'
    //choose from destinations from API .. or add new destination?
  });

  it.skip('should be able to calculate the total cost of trips this year', () => {
    traveler.myTrips = [allTrips[5], allTrips[4], allTrips[3], allTrips[2], allTrips[6], allTrips[0]];

    const calculateCostsThisYear = (year) => {
      let tripsThisYear = traveler.myTrips.filter(trip => {
        return trip.date.includes(year);
      })
      return tripsThisYear.reduce((acc, trip) => {
        let myDestinations = allDestinations.filter(destination => {
          return destination.id === trip.destinationID;
        })
        myDestinations.forEach(destination => {
          let totalLodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;
          let totalFlightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
          let combinedCost = totalLodgingCost + totalFlightCost;
          acc += (combinedCost + (combinedCost * .10));
        })
        return acc;
      }, 0)
    };

    expect(traveler.calculateCostsThisYear('2020')).to.equal(calculateCostsThisYear('2020'));
  });
});