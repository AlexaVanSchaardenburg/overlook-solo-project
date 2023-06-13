// IMPORTS
import './css/styles.css';
import './images/login-img.jpg'
import './images/logo-grey.png'
import './images/blue-logo.png'
import {
  bookRoom,
  loginToSite,
  showAllAvailableRooms,
  showDashPage,
  showFilteredRooms,
  showLoginPage
} from './domUpdates.js'

//QUERY SELECTORS
const bookingsPage = document.querySelector('#make-booking-page');
const bookRoomButton = document.querySelector('.book-room-button');
const chooseRoomButton = document.querySelector('#view-available-rooms');
const dashPage = document.querySelector('.dashboard');
const dateSelector = document.querySelector('#date-selector');
const errorBoxForNoDate = document.querySelector('.error-for-no-date');
const filterByTypeButton = document.querySelector('#filter-button');
const filterByTypeDisplay = document.querySelector('.filter-by-type');
const filterInput = document.querySelector('#room-select');
const homeButton = document.querySelector('.home-button');
const loginButton = document.querySelector('#login-button');
const loginErrorMessage = document.querySelector('.login-error-message');
const loginPage = document.querySelector('#login-page');
const navBar = document.querySelector('#nav-bar');
const passwordInput = document.querySelector('#password-input');
const returnToLoginButton = document.querySelector('#return-to-login');
const selectDateDisplay = document.querySelector('.select-date-form');
const selectedDateDisplay = document.querySelector('.selected-date');
const usernameInput = document.querySelector('#username-input');

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

bookingsPage.addEventListener('click', (event) => {
  bookRoom(event)
})

export {
  bookingsPage,
  bookRoomButton,
  dashPage,
  errorBoxForNoDate,
  filterByTypeDisplay,
  homeButton,
  loginErrorMessage,
  loginPage,
  navBar,
  returnToLoginButton,
  selectDateDisplay,
  selectedDateDisplay
}