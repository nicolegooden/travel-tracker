import domUpdates from './domUpdates.js';
import apiCalls from './apiCalls.js';

const loginButton = document.querySelector('.login-button');
let usernameInput = document.querySelector('.username-input');
let passwordInput = document.querySelector('.password-input');

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

function attemptLogin() {
  if (usernameInput.value !== ' ' && passwordInput.value !== ' ') {
    checkValidityOfUsername();
    checkValidityOfPassword();
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
      domUpdates.goToMyDashboard();
    }
  })
}

function checkValidityOfPassword() {
  if (passwordInput.value !== 'travel2020') {
    alert(`This password is invalid.  Please try again.`);
    resetLoginInputs();
  }
}

function resetLoginInputs() {
  usernameInput.value = ' ';
  passwordInput.value = ' ';
}