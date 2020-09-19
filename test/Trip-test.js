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
  let trip;

  beforeEach(() => {
    date = '2020/12/25';
    duration = 5;
    destination = 'Toronto, Canada';
    numberOfTravelers = 6;
    trip = new Trip(date, duration, numberOfTravelers, destination);


  });
});