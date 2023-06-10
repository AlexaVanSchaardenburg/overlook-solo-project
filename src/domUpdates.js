import {/* import helper functions here*/} from './functionality.js'
import {/* import query selected items and data from page load here*/

} from './scripts.js'

//FUNCTIONS

const hide = (element) => {
    element.classList.add('hidden')
};

const show = (element) => {
    element.classList.remove('hidden')
};

const showLoginPage = () => {
    //hide bookings page
    hide()
    //hide dash
    hide()
    //hide nav
    hide()
    //show login page
    show()
};

const showDashPage = () => {
    //hide login page
    hide()
    //hide bookings page
    hide()
    //hide date selected and choose room type boxes
    hide()
    //hide home button
    hide()
    //show dash page
    show()
    //show nav
    show()
    //show select date drop down
    show()
};

const showBookingsPage = () => {
    //hide dash page
    hide()
    //hide login page
    hide()
    //show nav
    show()
    //show selected date and choose room type buttons
    show()
    //show home button
    show()
    //hide select date drop down
    show()
};

const loginToSite = () => {
    // //invoke username and password functions here
    let userID = 50
    // if(/*if password check come back as true AND user name returns something other than invailide username */){
        const userResponse = fetch(`http://localhost:3001/api/v1/customers/${userID}`).then((response) => {
            if(!response.ok) {
                throw new Error(`${response.status}`)
            } else {
                return response.json();
            }
            }).catch(error => alert(`${error.message}`));
    //         //promise.all something or other here
    //         //add code here to switch page views to dash board
    // } else {
    //     //add message to the DOM that the user name or password is incorrect
    // }
};