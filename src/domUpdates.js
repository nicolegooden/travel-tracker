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
let popupMain = document.querySelector('.popup-main');

let domUpdates = {
  goToMyDashboard() {
    loginDisplay.classList.add('hidden-important');
    dashboardDisplay.classList.remove('hidden-important');
  },

  welcomeTravelerByName(firstName) {
    welcomeText.innerText = `Welcome, ${firstName}`;
  }, 

  showTripHistory(currentTraveler) {
    this.showPresentTrips(currentTraveler);
    this.showPastTrips(currentTraveler);
    this.showUpcomingTrips(currentTraveler);
    this.showPendingTrips(currentTraveler);
  },

  showPresentTrips(currentTraveler) {
    if (currentTraveler.presentTrip !== undefined) {
      presentTrip.innerHTML = `<h4 class='click-for-popup' id='${currentTraveler.presentTrip.id}'>${currentTraveler.presentTrip}</h4>`;
      //what if the traveler has more than one presentTrip?
    } else {
      presentTrip.innerHTML = `<h4>You're home, bummer!</h4>`;
    }
  },

  showPastTrips(currentTraveler) {
    currentTraveler.pastTrips.forEach(pastTrip => {
      pastTrips.innerHTML += `<h4 class='click-for-popup' id='${pastTrip.id}'>${pastTrip.myDestinationData.destination}<br></h4>`;
    })
  },

  showUpcomingTrips(currentTraveler) {
    currentTraveler.upcomingTrips.forEach(upcomTrip => {
      upcomingTrips.innerHTML += `<h4 class='click-for-popup' id='${upcomTrip.id}'>${upcomTrip.myDestinationData.destination}<br></h4>`;
    })
  },
  
  showPendingTrips(currentTraveler) {
    currentTraveler.pendingTrips.forEach(pendingTrip => {
      pendingTrips.innerHTML += `<h4 class='click-for-popup' id='${pendingTrip.id}'>${pendingTrip.myDestinationData.destination}<br></h4>`;
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
    this.showPendingTrips(currentTraveler);
  },

  showPotentialTripCost(estimatedCost) {
    costIndicator.innerText = `Estimated Cost: $ ${estimatedCost}`
  },

  openTripPopup(trip) {
    popupSection.classList.remove('hidden');
    popupMain.innerHTML = `<article class='close-popup'>
      <p class='x-close'>X</p></article>
      <h3>ID: ${trip.id}<br> 
       UserID: ${trip.userID}<br> 
       DestinationID: ${trip.destinationID}<br> 
       Number of Travelers: ${trip.travelers}<br> 
       Start Date: ${trip.date}<br> 
       Duration: ${trip.duration} days <br>  
      Status: ${trip.status}<br>  
      Lodging Per Day: $ ${trip.myDestinationData.estimatedLodgingCostPerDay}<br> 
      Flight Per Person: $ ${trip.myDestinationData.estimatedFlightCostPerPerson}<br> 
      Paid: $ ${trip.estimateTripCost()}</h3`;
  }, 

  closeTripPopup() {
    popupSection.classList.add('hidden');
  }
}

export default domUpdates;