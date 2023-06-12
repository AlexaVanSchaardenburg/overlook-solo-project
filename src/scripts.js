// IMPORTS
import './css/styles.css';
import './images/login-img.jpg'
import './images/logo-grey.png'
import './images/blue-logo.png'
import {
  showLoginPage,
  loginToSite,
  showAllAvailableRooms,
  showFilteredRooms,
  showDashPage,
  bookRoom
} from './domUpdates.js'

//API CALLS
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
const loginErrorMessage = document.querySelector('.login-error-message');
const dateSelector = document.querySelector('#date-selector');
const errorBoxForNoDate = document.querySelector('.error-for-no-date');
const filterInput = document.querySelector('#room-select');
const bookedRoomButton = document.querySelector('.book-room-button')

//EVENT LISTENERS
loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  loginToSite(usernameInput, passwordInput)
});

returnToLoginButton.addEventListener('click', showLoginPage)

chooseRoomButton.addEventListener('click', (event) => {
  event.preventDefault();
  showAllAvailableRooms(dateSelector)
});

filterByTypeButton.addEventListener('click', () => {
  showFilteredRooms(filterInput)
})

homeButton.addEventListener('click', showDashPage)

//event listener for booking button
bookedRoomButton.addEventListener('click', (event) => {
  bookRoom(event)
})

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
  dateSelector,
  errorBoxForNoDate
}