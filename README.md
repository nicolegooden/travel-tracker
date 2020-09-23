# Travel Tracker

A front-end project by [Nicole Gooden](https://github.com/nicolegooden).

## Project Overview

This project allows a prospective traveler to log in to their `Travel Tracker` account in the event they want to check their trip history or book a new trip.  The traveler has a unique username and universal password, which is what determines the traveler and their information from the `trips` API.

### Technologies

+ Fetch API (GET and POST requests with server)
+ SASS for DRY CSS style applications
+ Mocha & Chai for testing Classes

### Installation

1. Clone this repo to the local computer using `git clone` on the CLI. followed by the copied SSH link from the green `Code` button.

1. Run `npm install` to install all NPM dependencies.

1. From the terminal, run `npm run-script build` to allow the building of Webpack-related files.

1. From the terminal, run `npm start` to get the server going. There will be confirmation in the form of a `Compiled successfully` message when this is complete.

1. Click the link, `http://localhost: 8080/` to open what's running from the server in the browser.  If changes are saved from the code editor (Atom, VS Code, etc.), the live server will auto-update to reflect those changes.

### Preview

![login view]()
![dashboard view]()
![mobile dashboard]()
![trip popup]()

### Wins

+ Constructs an object that is accepted by the `trips` API through a POST request
+ Application UI is logical and predictable
+ Optimal OOP implementation via `domUpdates{ }`, `apiCalls{ }`, `Trip`, and `Traveler` Classes

### Challenges

+ Organizing the communication betweeen files was a bit confusing initially.  Once I figured out how Webpack was configured, as well as how `import/export` syntax worked, further implementation was easier.

+ Working with the `Date` object was a first for me.  I used an open-source `time` object to call any methods that compared two `Dates`.  Formatting dates is something I am still practicing, and I feel the exposure to `Date` will be beneficial moving forward.  

### Next Steps

+ Remove many query selectors from global scope to local scope.  Some are used only once and, in that case, they do not need to be accessed globally.  Definitely can clean that up!

+ Change the `currentTraveler` property for `presentTrip` to be an array, to account for the edge case that a `Traveler` could be on two trips.

+ Fix bug related to confirmation alert (when trip is booked).  If the user does not select a date, the alert will show up even though a trip with invalid criteria was requested.  The confirmation alert shows, then the error alert from the POST request shows, and the trip is not added to the list of pending trips.  In a future iteration, I plan to only show the confirmation alert is the trip has been successfully displayed as a pending trip on the dashboard.

+ Enhance responsivity and styles.  When a traveler with a lot of trips logs in, the dashboard looks unorganized and the text can be pushed outside its visible bounds.