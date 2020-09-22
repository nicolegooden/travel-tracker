import './scripts.js';

const loginDisplay = document.querySelector('.log-in-display');
const dashboardDisplay = document.querySelector('.dashboard-display');
let welcomeText = document.querySelector('.welcome-name');

let domUpdates = {
  goToMyDashboard() {
    loginDisplay.classList.add('hidden-important');
    dashboardDisplay.classList.remove('hidden-important');
  },

  welcomeTravelerByName(firstName) {
    welcomeText.innerText = `Welcome, ${firstName}`;
  }
}

export default domUpdates;