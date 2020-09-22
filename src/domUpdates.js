import './scripts.js';

const loginDisplay = document.querySelector('.log-in-display');
const dashboardDisplay = document.querySelector('.dashboard-display');
let welcomeText = document.querySelector('.welcome-name');
let presentTrip = document.querySelector('.present-trip-data');
let pastTrips = document.querySelector('.past-trips-data');
let upcomingTrips = document.querySelector('.upcoming-trips-data');
let pendingTrips = document.querySelector('.pending-trips-data');
let yearCost = document.querySelector('.year-cost');
let destinationSelections = document.querySelector('.destination-selections');
let costIndicator = document.querySelector('.cost-indicator');
let popupSection = document.querySelector('.popup-section');
let x = document.querySelector('.close-popup');
let historyBox = document.querySelector('.history-box');

// historyBox.addEventListener('click', () => {
//   let closestHistorySection = event.target.closest('.data');
//   closestHistorySection
// })


// presentTrip.addEventListener('click', () => {

// })

// pastTrips.addEventListener('click', () => {

// })

// pendingTrips.addEventListener('click', () => {

// })

// upcomingTrips.addEventListener('click', () => {

// })

let domUpdates = {
  goToMyDashboard() {
    loginDisplay.classList.add('hidden-important');
    dashboardDisplay.classList.remove('hidden-important');
  },

  welcomeTravelerByName(firstName) {
    welcomeText.innerText = `Welcome, ${firstName}`;
  }, 

  showTripHistory(currentTraveler) {
    if (currentTraveler.presentTrip !== undefined) {
      presentTrip.innerHTML = `<h4>${currentTraveler.presentTrip}</h4>`;
   //what if the traveler has more than one presentTrip?
    } else {
      presentTrip.innerHTML = `<h4>You're home, bummer!</h4`;
    }
    currentTraveler.pastTrips.forEach(pastTrip => {
      pastTrips.innerHTML += `<h4>${pastTrip.myDestinationData.destination}<br></h4>`;
    })
    currentTraveler.upcomingTrips.forEach(upcomTrip => {
      upcomingTrips.innerHTML += `<h4>${upcomTrip.myDestinationData.destination}<br></h4>`;
    })
    currentTraveler.pendingTrips.forEach(pendingTrip => {
      pendingTrips.innerHTML += `<h4>${pendingTrip.myDestinationData.destination}<br></h4>`;
    })
  },

  showCostsThisYear(moneyThisYear) {
    yearCost.innerText = `$ ${moneyThisYear}`
  },

  showDestinationSelections(allDestinations) {
    allDestinations.forEach(destination => {
      destinationSelections.innerHTML += 
      `<option value='${destination.id}'>${destination.destination}</option>`;
    })
  },

  updatePendingTripsAfterRequest(currentTraveler) {
    pendingTrips.innerText = ' ';
    currentTraveler.pendingTrips.forEach(pendingTrip => {
      pendingTrips.innerText += `${pendingTrip.myDestinationData.destination} \n`;
    })
  },

  showPotentialTripCost(estimatedCost) {
    costIndicator.innerText = `Estimated Cost: $ ${estimatedCost}`
  },

  openTripPopup() {
    popupSection.classList.remove('hidden');
  }, 

  closeTripPopup() {
    popupSection.classList.add('hidden');
    //this is to be called when the x is clicked on the popup
    //maybe x variable needs to exist in scripts instead
  },

  getTripDetails() {
    //when openTripPopup() is fired

  }
}

export default domUpdates;