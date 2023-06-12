import {
    checkPassword,
    checkUsername,
    findUserBookings,
    calcTotalBookingsCost,
    findAvailableRooms,
    filterRoomsByType
} from './functionality.js'

import {
//APIs
roomsResponse,
bookingsResponse,
//query selected
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
loginErrorMessage
} from './scripts.js'

//VARIABLES

let user, rooms, bookings;

//FUNCTIONS

const hide = (element) => {
    element.classList.add('hidden')
};

const show = (element) => {
    element.classList.remove('hidden')
};

const showLoginPage = () => {
    hide(bookingsPage)
    hide(dashPage)
    hide(navBar)
    show(loginPage)
};

const showDashPage = () => {
    hide(loginPage)
    hide(bookingsPage)
    hide(homeButton)
    hide(selectedDateDisplay)
    hide(filterByTypeDisplay)
    show(dashPage)
    show(navBar)
    show(selectDateDisplay)
};

const showBookingsPage = () => {
    hide(dashPage)
    hide(loginPage)
    hide(selectDateDisplay)
    show(navBar)
    show(selectedDateDisplay)
    show(homeButton)
};

const loginToSite = (usernameInput, passwordInput) => {
    // //invoke username and password functions here
    // let userID = '50'
    // if(/*if password check come back as true AND user name returns something other than invailid username */){
    //     const userResponse = fetch(`http://localhost:3001/api/v1/customers/${userID}`).then((response) => {
    //         if(!response.ok) {
    //             throw new Error(`${response.status}`)
    //         } else {
    //             return response.json();
    //         }
    //         }).catch(error => alert(`${error.message}`));
    // //         //promise.all something or other here
    //         //add code here to switch page views to dash board
    // } else {
    //     //add message to the DOM that the user name or password is incorrect
    // }


    const userID = checkUsername(usernameInput.value)
    const passwordValid = checkPassword(passwordInput.value)

    if(passwordValid && !isNaN(userID)){
        //fetch user info
        loginErrorMessage.innerText = ''
        const userResponse = fetch(`http://localhost:3001/api/v1/customers/${userID}`).then((response) => {
            if(!response.ok) {
                throw new Error(`${response.status}`)
            } else {
                return response.json();
            }
            }).catch(error => alert(`${error.message}`));
        //promise.all to reassign variables for rooms, bookings, and user
        Promise.all([userResponse, roomsResponse, bookingsResponse]).then(([userData, roomsData, bookingsData]) => {

            user = userData
            rooms = roomsData
            bookings = bookingsData

            //invoke functions to filter user bookings (h)
            //change innerHTML to display username
            //change innerHTML to show users bookings
            //then invoke show dash (h)
        })
    } else {
        //change innerHTML to inlcude an error message above login button
        loginErrorMessage.innerText = 'Username or password is incorrect'
    }
};

const showAvailableRooms = () => {

}

export {
    showLoginPage,
    loginToSite
}