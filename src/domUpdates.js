import './scripts.js';

const loginDisplay = document.querySelector('.log-in-display');
const dashboardDisplay = document.querySelector('.dashboard-display');
let welcomeText = document.querySelector('.welcome-name');
let presentTrip = document.querySelector('.present-trip-data');
let pastTrips = document.querySelector('.past-trips-data');
let upcomingTrips = document.querySelector('.upcoming-trips-data');
let pendingTrips = document.querySelector('.pending-trips-data');

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
      presentTrip.innerText = `${currentTraveler.presentTrip}`;
    } else {
      presentTrip.innerText = 'You\'re home, bummer!';
    }
    currentTraveler.pastTrips.forEach(pastTrip => {
      pastTrips.innerText += `${pastTrip.myDestinationData.destination} \n `;
    })
    currentTraveler.upcomingTrips.forEach(upcomTrip => {
      upcomingTrips.innerText += `${upcomTrip.myDestinationData.destination} \n `;
    })
    currentTraveler.pendingTrips.forEach(pendingTrip => {
      pendingTrips.innerText += `${pendingTrip.myDestinationData.destination} \n`;
    })
  }
}

export default domUpdates;