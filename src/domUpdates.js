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
let popupMain = document.querySelector('.popup-main');

// x.addEventListener('click', closeTripPopup)

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
      presentTrip.innerHTML = `<h4 id='${currentTraveler.presentTrip.id}'>${currentTraveler.presentTrip}</h4>`;
      //what if the traveler has more than one presentTrip?
    } else {
      presentTrip.innerHTML = `<h4>You're home, bummer!</h4`;
    }
  },

  showPastTrips(currentTraveler) {
    currentTraveler.pastTrips.forEach(pastTrip => {
      pastTrips.innerHTML += `<h4 id='${pastTrip.id}'>${pastTrip.myDestinationData.destination}<br></h4>`;
    })
  },

  showUpcomingTrips(currentTraveler) {
    currentTraveler.upcomingTrips.forEach(upcomTrip => {
      upcomingTrips.innerHTML += `<h4 id='${upcomTrip.id}'>${upcomTrip.myDestinationData.destination}<br></h4>`;
    })
  },
  
  showPendingTrips(currentTraveler) {
    currentTraveler.pendingTrips.forEach(pendingTrip => {
      pendingTrips.innerHTML += `<h4 id='${pendingTrip}'>${pendingTrip.myDestinationData.destination}<br></h4>`;
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

  openTripPopup(trip) {
    popupSection.classList.remove('hidden');
    //change innerText to innerHTML
    //add it wherever inside innerHTML
    popupMain.innerText = `ID: ${trip.id}\n 
       UserID: ${trip.userID}\n 
       DestinationID: ${trip.destinationID}\n  
       Number of Travelers: ${trip.travelers}\n 
       Start Date: ${trip.date}\n 
       Duration: ${trip.duration} days\n 
      Status: ${trip.status}\n 
      Lodging Per Day: $ ${trip.myDestinationData.estimatedLodgingCostPerDay}\n
      Flight Per Person: $ ${trip.myDestinationData.estimatedFlightCostPerPerson}`;
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