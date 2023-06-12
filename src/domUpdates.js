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
dateSelector,
errorBoxForNoDate
} from './scripts.js'

let user, rooms, bookings, currentDate;

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
    show(filterByTypeDisplay)
    show(bookingsPage)
};

const loginToSite = (usernameInput, passwordInput) => {

    const userID = checkUsername(usernameInput.value)
    const passwordValid = checkPassword(passwordInput.value)

    if(passwordValid && !isNaN(userID)){

        loginErrorMessage.innerText = ''
        const userResponse = fetch(`http://localhost:3001/api/v1/customers/${userID}`).then((response) => {
            if(!response.ok) {
                throw new Error(`${response.status}`)
            } else {
                return response.json();
            }
            }).catch(error => alert(`${error.message}`));

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

const showAvailableRooms = (rooms) => {
    const checksIfBidet = (boolean) => {
        if(boolean) {
            return `This room has a bidet!`
        } else {
            return ``
        }
    }
    selectedDateDisplay.innerHTML = `<p>date selected:</p>
    <p id="current-date">${currentDate}</p>`

    bookingsPage.innerHTML = ''
    rooms.forEach(room => {
        bookingsPage.innerHTML += `<div class="available-room flex">
        <div class="rm-info">
          <h3 class="room-type">${room.roomType}</h3>
          <div class="sub-info flex">
            <p class="rm-info-element"><span class="material-symbols-rounded">king_bed</span>${room.bedSize} x ${room.numBeds}</p>
            <p class="rm-info-element"><span class="material-symbols-rounded">monetization_on</span>Room Cost</p>
            <p class="rm-info-element">${checksIfBidet(room.bidet)}</p>
          </div>
        </div>
        <button class="book-room-button" id="r${room.number}">Book this room!</button>
      </div>`
    })
}

const showAllAvailableRooms = (dateSelector) => {
    currentDate = dateSelector.value
    if (currentDate){
        let availableRooms = findAvailableRooms(currentDate, bookings, rooms)
        showAvailableRooms(availableRooms)
        showBookingsPage()
    } else {
        errorBoxForNoDate.innerText = 'Please select a date!'
    }
}

const showFilteredRooms = (filterInput) => {
    //take in filter input
    //invoke function to make list of filtered rooms from available rooms list
    let availableRooms = findAvailableRooms(currentDate, bookings, rooms)
    let filteredAvailableRooms = filterRoomsByType(availableRooms, filterInput.value)
    //invoke funtion to update html
    if(filterInput.value === 'Residential Suite' || filterInput.value === 'Suite' || filterInput.value === 'Single Room' || filterInput.value === 'Junior Suite'){
        showAvailableRooms(filteredAvailableRooms)
    } else if (filterInput.value === 'All') {
        showAvailableRooms(availableRooms)
    } else {
        bookingsPage.innerHTML = `<p>${filteredAvailableRooms}</p>`
    }
}

export {
    showLoginPage,
    loginToSite,
    showAllAvailableRooms,
    showFilteredRooms
}