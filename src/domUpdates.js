import {
    checkPassword,
    checkUsername,
    findUserBookings,
    calcTotalBookingsCost,
    findAvailableRooms,
    filterRoomsByType
} from './functionality.js'

import {
    bookingsPage,
    dashPage,
    errorBoxForNoDate,
    filterByTypeDisplay,
    homeButton,
    loginErrorMessage,
    loginPage,
    navBar,
    returnToLoginButton,
    selectDateDisplay,
    selectedDateDisplay,
} from './scripts.js'

//VARIABLES

let user, rooms, bookings, currentDate;

//API CALLS

const getUser = (id) => {
    return fetch(`http://localhost:3001/api/v1/customers/${id}`).then((response) => {
        if(!response.ok) {
            throw new Error(`${response.status}`)
        } else {
            return response.json();
        }
        }).catch(error => alert(`${error.message}`));
};

const getRooms = () => {
    return fetch('http://localhost:3001/api/v1/rooms').then((response) => {
      if(!response.ok) {
        throw new Error(`${response.status}`)
      } else {
        return response.json();
      }
    }).catch(error => alert(`${error.message}`));
  };
  
  const getBookings = () => {
    return fetch('http://localhost:3001/api/v1/bookings').then((response) => {
      if(!response.ok) {
        throw new Error(`${response.status}`)
      } else {
        return response.json();
      }
    }).catch(error => alert(`${error.message}`));
  };

  const postBookings = (id) => {
    fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify({
          userID: user.id,
          date: currentDate.replaceAll('-','/'),
          roomNumber: parseInt(id)
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(() => getBookings())
      .then(bookingsResponse => {
        bookings = bookingsResponse.bookings
    }).then(() => {
        displayBookings(user, rooms, bookings)
    })
      .catch(err => alert(err));
};

//FUNCTIONS

const hide = (element) => {
    element.classList.add('hidden');
};

const show = (element) => {
    element.classList.remove('hidden');
};

const showLoginPage = () => {
    hide(bookingsPage);
    hide(dashPage);
    hide(navBar);
    show(loginPage);
};

const showDashPage = () => {
    hide(loginPage);
    hide(bookingsPage);
    hide(homeButton);
    hide(selectedDateDisplay);
    hide(filterByTypeDisplay);
    show(dashPage);
    show(navBar);
    show(selectDateDisplay);
};

const showBookingsPage = () => {
    hide(dashPage);
    hide(loginPage);
    hide(selectDateDisplay);
    show(navBar);
    show(selectedDateDisplay);
    show(homeButton);
    show(filterByTypeDisplay);
    show(bookingsPage);
};

const displayBookings = (user, rooms, bookings) => {

    let userBookings = findUserBookings(user, bookings);
    let userBookingsCost = calcTotalBookingsCost(rooms, userBookings);

    dashPage.innerHTML = `<div class="flex" id="bookings-title-bar">
        <h2 id="all-bookings">Past Bookings</h2>
        <div class="flex">
            <p id="total-cost-label">total spent: </p>
            <p id="total-cost"><span class="material-symbols-rounded">monetization_on</span>${userBookingsCost.toFixed(2)}</p>
        </div>`;

    userBookings.reverse().forEach(booking => {
        dashPage.innerHTML += `
        <div class="booking-display flex" id="booking-number">
            <h3 class="room-type">${rooms[booking.roomNumber - 1].roomType}</h3>
            <p class="booking-date"><span class="material-symbols-rounded">calendar_month</span>${booking.date}</p>
            <p class="booking-cost"><span class="material-symbols-rounded">monetization_on</span>${rooms[booking.roomNumber-1].costPerNight}</p>
        </div>`;
    })
};

const displayPastBookings = (userID) => {

    let bookingsResponse = getBookings()
    let roomsResponse = getRooms()
    let userResponse = getUser(userID)

    loginErrorMessage.innerText = ''

    Promise.all([userResponse, roomsResponse, bookingsResponse]).then(([userData, roomsData, bookingsData]) => {

        user = userData;
        rooms = roomsData.rooms;
        bookings = bookingsData.bookings;

        returnToLoginButton.innerHTML = `Log out of user ${user.name}`;

        displayBookings(user, rooms, bookings)
    })
};

const loginToSite = (usernameInput, passwordInput) => {

    const userID = checkUsername(usernameInput.value);
    const passwordValid = checkPassword(passwordInput.value);

    if(passwordValid && !isNaN(userID)){
        displayPastBookings(userID)
        showDashPage()
    } else {
        loginErrorMessage.innerText = 'Username or password is incorrect'
    };
};

const showAvailableRooms = (rooms) => {
    const checksIfBidet = (boolean) => {
        if(boolean) {
            return `This room has a bidet!`
        } else {
            return ``
        };
    };
    selectedDateDisplay.innerHTML = `<p>date selected:</p>
    <p id="current-date">${currentDate}</p>`;

    bookingsPage.innerHTML = ''
    rooms.forEach(room => {
        bookingsPage.innerHTML += `<div class="available-room flex">
        <div class="rm-info">
          <h3 class="room-type">${room.roomType}</h3>
          <div class="sub-info flex">
            <p class="rm-info-element"><span class="material-symbols-rounded">king_bed</span>${room.bedSize} x ${room.numBeds}</p>
            <p class="rm-info-element"><span class="material-symbols-rounded">monetization_on</span>${room.costPerNight}</p>
            <p class="rm-info-element">${checksIfBidet(room.bidet)}</p>
          </div>
        </div>
        <button class="book-room-button" id="${room.number}">Book this room!</button>
      </div>`
    });
};

const showAllAvailableRooms = (dateSelector) => {
    currentDate = dateSelector.value;
    if (currentDate){
        let availableRooms = findAvailableRooms(currentDate, bookings, rooms)
        showAvailableRooms(availableRooms)
        showBookingsPage()
    } else {
        errorBoxForNoDate.innerText = 'Please select a date!'
    };
};

const showFilteredRooms = (filterInput) => {
    let availableRooms = findAvailableRooms(currentDate, bookings, rooms);
    let filteredAvailableRooms = filterRoomsByType(availableRooms, filterInput.value);

    if(filterInput.value === 'Residential Suite' || filterInput.value === 'Suite' || filterInput.value === 'Single Room' || filterInput.value === 'Junior Suite'){
        showAvailableRooms(filteredAvailableRooms)
    } else if (filterInput.value === 'All') {
        showAvailableRooms(availableRooms)
    } else {
        bookingsPage.innerHTML = `<p>${filteredAvailableRooms}</p>`
    };
};

const bookRoom = (event) => {
    if (event.target instanceof HTMLButtonElement){
        postBookings(event.target.id)
        event.target.innerText = 'Booking complete!'
    }
};

export {
    bookRoom,
    loginToSite,
    showAllAvailableRooms,
    showDashPage,
    showFilteredRooms,
    showLoginPage
}