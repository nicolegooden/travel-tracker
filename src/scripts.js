import domUpdates from './domUpdates.js';
import apiCalls from './apiCalls.js';
import Traveler from './Traveler.js';
import time from './time.js';
import Trip from './Trip.js';

const loginButton = document.querySelector('.login-button');
let usernameInput = document.querySelector('.username-input');
let passwordInput = document.querySelector('.password-input');
const loginDisplay = document.querySelector('.log-in-display');
let dateInput = document.querySelector('.date-input');
let durationInput = document.querySelector('.duration-input');
let travelersInput = document.querySelector('.travelers-input');
let destinationSelections = document.querySelector('.destination-selections');
let bookTripButton = document.querySelector('.book-trip-button');

let allTravelers;
let allTrips;
let allDestinations;
let currentTraveler;

window.addEventListener('load', () =>{
  apiCalls.accessAllData().then(data => {
    allTravelers = data[0];
    allTrips = data[1];
    allDestinations = data[2];
  })
})

loginButton.addEventListener('click', () => {
  attemptLogin()
})

dateInput.addEventListener('change', formatDateInput);
bookTripButton.addEventListener('click', gatherNewTrip);

function gatherNewTrip() {
  let duration = parseInt(durationInput.value);
  let travelers = parseInt(travelersInput.value);
  let trip = {
    id: getID(allTrips),
    userID: currentTraveler.id,
    destinationID: getDestinationInfo(),
    travelers,
    date: formatDateInput(),
    duration,
    status: 'pending',
    suggestedActivities: []
  }
  apiCalls.postNewTrip(trip, currentTraveler, allDestinations);
}

function getID(allTrips) {
  let tripIDList = allTrips.filter(trip => {
    return trip.id;
  })
  tripIDList.sort((a, b) => {
    return b.id - a.id;
  })
  return tripIDList[0].id + 1;
}

function formatDateInput() {
  let piecesOfDate = dateInput.value.split('-');
  let year = piecesOfDate[0];
  let month = piecesOfDate[1];
  let day = piecesOfDate[2];
  return year + '/' + month + '/' + day;
}

function getDestinationInfo() {
  let myDesiredSpot = allDestinations.find(destination => {
    return parseInt(destinationSelections.value) === destination.id;
  })
  return myDesiredSpot.id;
}

function getToday() {
  let today = new Date();
  return today;
}

function getYearForToday() {
  return getToday().getYear() + 1900;
}

function attemptLogin() {
  if (usernameInput.value !== ' ' && passwordInput.value !== ' ') {
    checkValidityOfUsername();
  } else {
    alert('Please type in your username and password.');
  }
}

function checkValidityOfUsername() {
  let possibleTravelers = allTravelers.filter(traveler => {
    return usernameInput.value.includes(traveler.id);
  })
  if (possibleTravelers.length === 0) {
    alert('This username is invalid.  Please try again.');
    resetLoginInputs();
    return
  } 
  possibleTravelers.forEach(traveler => {
    if (usernameInput.value === ('traveler' + traveler.id)) {
      currentTraveler = traveler;
      checkValidityOfPassword();
    }
  })
}

function checkValidityOfPassword() {
  if (passwordInput.value !== 'travel2020') {
    alert(`This password is invalid.  Please try again.`);
    resetLoginInputs();
  } else {
    domUpdates.goToMyDashboard();
    createTraveler()
    domUpdates.welcomeTravelerByName();
    determineTravelerTrips();
    getFirstName();
    domUpdates.showTripHistory(currentTraveler);
    getCostsThisYear();
    domUpdates.showDestinationSelections(allDestinations);
  }
}

function resetLoginInputs() {
  usernameInput.value = ' ';
  passwordInput.value = ' ';
}

function createTraveler() {
  if (loginDisplay.classList.contains('hidden-important')) {
    currentTraveler = new Traveler(currentTraveler);
  }
}

function determineTravelerTrips() {
  currentTraveler.findAllTrips(allTrips, allDestinations);
  currentTraveler.sortMyTrips(getToday(), time);
}

function getFirstName() {
  let firstName = currentTraveler.name.split(' ')[0];
  domUpdates.welcomeTravelerByName(firstName);
}

function getCostsThisYear() {
  let moneyThisYear = currentTraveler.calculateCostsThisYear(getYearForToday());
  domUpdates.showCostsThisYear(moneyThisYear)
}

