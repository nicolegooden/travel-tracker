import Trip from './Trip.js';
import domUpdates from './domUpdates.js';

let apiCalls = {
  getAllTravelers() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
      .then(response => response.json())
      .then(allTravelers => {
        return allTravelers.travelers
      })
      .catch(err => {
        console.log(err);
        alert('Oops, all travelers failed to load.');
      })
  },

  getAllTrips() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
      .then(response => response.json())
      .then(allTrips => allTrips.trips)
      .catch(err => {
        console.log(err);
        alert('Oops, all trips failed to load.');
      })
  }, 

  getAllDestinations() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
      .then(response => response.json())
      .then(allDestinations => allDestinations.destinations)
      .catch(err => {
        console.log(err);
        alert('Oops, all destinations failed to load.');
      })
  },
 
  accessAllData() {
    return Promise.all([apiCalls.getAllTravelers(), apiCalls.getAllTrips(), apiCalls.getAllDestinations()])
      .then(values => {
        return values;
      })
      .catch(err => {
        console.log(err);
        alert('Oops, all of the information failed to load.');
      })
  },

  postNewTrip(anotherTrip, currentTraveler, allDestinations) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(anotherTrip), 
    })
      .then(response => response.json())
      .then(data => {
        let requestedTrip = data.newResource;
        let myDestinationInfo = allDestinations.find(destination => {
          return destination.id === requestedTrip.destinationID;
        })
        requestedTrip = new Trip(requestedTrip, myDestinationInfo)
        currentTraveler.myTrips.push(requestedTrip);
        currentTraveler.pendingTrips.push(requestedTrip);
        domUpdates.updatePendingTripsAfterRequest(currentTraveler);
      })
      .catch(err => {
        console.log(err)
        alert('Oops, the trip request cannot be processed at this time.')
      });
  }
}
    
export default apiCalls;
    

