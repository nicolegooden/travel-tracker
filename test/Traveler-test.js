import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/Traveler.js';

const allTravelers = [
  {
    "id": 1,
    "name": "Ham Leadbeater",
    "travelerType": "relaxer"
  },
  {
    "id": 2,
    "name": "Rachael Vaughten",
    "travelerType": "thrill-seeker"
  },
  {
    "id": 3,
    "name": "Sibby Dawidowitsch",
    "travelerType": "shopper"
  }
]

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

  it('should keep track of all of its trips', () => {
    expect(traveler.trips).to.deep.equal([]);
  });
  //possibly need to test with real trips passed from the Trip Class later

//   it('should have a unique username for login', () => {
//     let username = 'traveler1';
//     expect(traveler.username).to.equal(username);
//   });

  it('should have a unique password for login', () => {
    expect(traveler.password).to.equal('travel2020');
    //this is a default for all travelers - can be hard coded in constructor
  });
});