const loginDisplay = document.querySelector('.log-in-display');
const dashboardDisplay = document.querySelector('.dashboard-display');

let domUpdates = {
  goToMyDashboard() {
    loginDisplay.classList.add('hidden-important');
    dashboardDisplay.classList.remove('hidden-important');
  }
}

export default domUpdates;