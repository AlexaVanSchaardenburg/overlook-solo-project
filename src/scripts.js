// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// CSS import
import './css/styles.css';

// Image imports
import './images/login-img.jpg'
import './images/logo-grey.png'
import './images/blue-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

//LOGIN PAGE FUNCTIONALITY
    /*
    - checks if first 8 characters of username is customer - return boolean - write into functionality.js
    - takes ending characters and iterpolates them into fetch call to get back the user
    - uses checkPassword fucntion to checck password - return boolean
    - when login button is clicked - IF username and password return true, after fetch resolves, move to dashbaord page - if one is false rturn message that username or password is incorrect
    */

//



let userData, roomsData, bookingsData;

const userResponse = fetch(`http://localhost:3001/api/v1/customers/${//put user id here
}`).then((response) => {
  if(!response.ok) {
    throw new Error(`${response.status}`)
  } else {
    return response.json();
  }
}).catch(error => alert(`${error.message}`));

const roomsResponse = fetch('http://localhost:3001/api/v1/rooms').then((response) => {
  if(!response.ok) {
    throw new Error(`${response.status}`)
  } else {
    return response.json();
  }
}).catch(error => alert(`${error.message}`));

const bookingsResponse = fetch('http://localhost:3001/api/v1/bookings').then((response) => {
    if(!response.ok) {
      throw new Error(`${response.status}`)
    } else {
      return response.json();
    }
  }).catch(error => alert(`${error.message}`));

  window.addEventListener('load', () => {
    Promise.all([userResponse, roomsResponse, bookingsResponse]).then(([user, rooms, bookings]) => {
    
    userData = user.user
    roomsData = rooms.rooms
    bookingsData = bookings.bookings

    //instead of doing rooms and bookings here do them on click of the login button to display data - then it should be available to the page when the user selects a date
    
    // showRecipesPage();
    // user = selectRandomUser(usersData);
    // displayAllRecipes(recipeData);
    // return user;
    })});

    window.addEventListener('load', () => {
        Promise.all([userResponse, roomsResponse, bookingsResponse]).then(([user, rooms, bookings]) => {
        
        userData = user.user
        roomsData = rooms.rooms
        bookingsData = bookings.bookings
    
        //instead of doing rooms and bookings here do them on click of the login button to display data - then it should be available to the page when the user selects a date
        
        // showRecipesPage();
        // user = selectRandomUser(usersData);
        // displayAllRecipes(recipeData);
        // return user;
        })});
