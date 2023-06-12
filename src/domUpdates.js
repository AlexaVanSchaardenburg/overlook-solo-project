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
loginErrorMessage,
bookingsDisplay
} from './scripts.js'

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
            rooms = roomsData.rooms
            bookings = bookingsData.bookings

            let userBookings = findUserBookings(user, bookings)
            let userBookingsCost = calcTotalBookingsCost(rooms, userBookings)

            returnToLoginButton.innerText = `Log out of user ${user.name}`
            dashPage.innerHTML = `<div class="flex" id="bookings-title-bar">
                <h2 id="all-bookings">All Bookings</h2>
                <div class="flex">
                    <p id="total-cost-label">total spent: </p>
                    <p id="total-cost"><span class="material-symbols-rounded">monetization_on</span>${userBookingsCost}</p>
                </div>`

            userBookings.forEach(booking => {
                dashPage.innerHTML += `
                <div class="booking-display flex" id="booking-number">
                    <h3 class="room-type">${rooms[booking.roomNumber - 1].roomType}</h3>
                    <p class="booking-date"><span class="material-symbols-rounded">calendar_month</span>${booking.date}</p>
                    <p class="booking-cost"><span class="material-symbols-rounded">monetization_on</span>${rooms[booking.roomNumber-1].costPerNight}</p>
                </div>`
            })
            showDashPage()
        })
    } else {
        loginErrorMessage.innerText = 'Username or password is incorrect'
    }
};

const showAvailableRooms = () => {

}

export {
    showLoginPage,
    loginToSite
}