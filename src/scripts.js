// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// CSS import
import './css/styles.css';

// Image imports
import './images/login-img.jpg'
import './images/logo-grey.png'
import './images/blue-logo.png'

import {
  showLoginPage,
  loginToSite,
} from './domUpdates.js'


//LOGIN PAGE FUNCTIONALITY
    /*
    - checks if first 8 characters of username is customer - return boolean - write into functionality.js
    - takes ending characters and iterpolates them into fetch call to get back the user
    - uses checkPassword fucntion to checck password - return boolean
    - when login button is clicked - IF username and password return true, after fetch resolves, move to dashbaord page - if one is false rturn message that username or password is incorrect
    */

// //API CALLS

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

//QUERY SELECTORS

const loginButton = document.querySelector('#login-button');
const homeButton = document.querySelector('.home-button');
const returnToLoginButton = document.querySelector('#return-to-login');
const chooseRoomButton = document.querySelector('#view-available-rooms');
const filterByTypeButton = document.querySelector('#filter-button'); 
const navBar = document.querySelector('#nav-bar');
const dashPage = document.querySelector('.dashboard');
const bookingsPage = document.querySelector('#make-booking-page') 
const loginPage = document.querySelector('#login-page');
const selectDateDisplay = document.querySelector('.select-date-form');
const selectedDateDisplay = document.querySelector('.selected-date');
const filterByTypeDisplay = document.querySelector('.filter-by-type');
const usernameInput = document.querySelector('#username-input');
const passwordInput = document.querySelector('#password-input');
const loginErrorMessage = document.querySelector('.login-error-message')

//EVENT LISTENERS

//   window.addEventListener('load', () => {
//     Promise.all([roomsResponse, bookingsResponse]).then(([rooms, bookings]) => {
    
//     roomsData = rooms.rooms
//     bookingsData = bookings.bookings

//     //do all this on buttton click for login button
    
//     // showRecipesPage();
//     // user = selectRandomUser(usersData);
//     // displayAllRecipes(recipeData);
//     // return user;

//     //maybe here I need to do all the dom updating for the past bookings and rooms data? -no
//     //need to return the rooms data and the bookings data -no
//     //to return both, might need to put these in different places? -no
//     //can reassign all here and then they will be available eventually, only need to do the functionality for what ever needs to be visible ASAP (aka do rooms and bookings on page load and then they will be hpefully be ready by the time we use them on the next pages) -- need to wait on user being assigned 
//     //I think this will work becuase javascipt will only put invoked functions into the call stack so the functions that need this data will not be in there until after the login button is click - thus this means that we should get back that data before we use it (counting on the user taking a bit of time to put in the user name and password and then clicking the login button)
//     })});


loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  loginToSite(usernameInput, passwordInput)
});

returnToLoginButton.addEventListener('click', showLoginPage)

// chooseRoomButton.addEventListener('click', showAvailableRooms)

export {
  roomsResponse,
  bookingsResponse,
  homeButton,
  returnToLoginButton,    
  chooseRoomButton,    
  filterByTypeButton,    
  navBar,    
  dashPage,    
  bookingsPage,   
  loginPage,   
  selectDateDisplay,    
  selectedDateDisplay,  
  filterByTypeDisplay,
  loginErrorMessage,
}