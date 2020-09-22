import domUpdates from './domUpdates.js';
import apiCalls from './apiCalls.js';
import Traveler from './Traveler.js';
import time from './time.js';

const loginButton = document.querySelector('.login-button');
let usernameInput = document.querySelector('.username-input');
let passwordInput = document.querySelector('.password-input');
const loginDisplay = document.querySelector('.log-in-display');

let allTravelers;
let allTrips;
let allDestinations;
let currentTraveler;

window.addEventListener('load', () =>{
  apiCalls.accessAllData().then(data => {
    allTravelers = data[0];
    allTrips = data[1];
    allDestinations = data[2];
  }); 
})

loginButton.addEventListener('click', () => {
  attemptLogin()
});

function getToday() {
  let today = new Date();
  return today;
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
  // welcomeText.innerText = `Welcome, ${firstName};`
}