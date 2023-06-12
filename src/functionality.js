const checkPassword = (password) => {
  if (password === 'overlook2021') {
        return true
    } else {
        return false
    }
};

const checkUsername = (username) => {
    if (username) {
        let usernameFirst8 = username.split('').splice(0, 8).join('')
        if (usernameFirst8 === 'customer') {
            let id = username.split('').splice(8).join('')
            return id
        } else {
            return 'Username is incorrect'
        }
    } else {
        return "No user name found"
    }
};

const findUserBookings = (user, bookings) => {
    return bookings.filter(booking => booking.userID === user.id)
}

const convertBookingsToRooms = (userBookings, rooms) => {
    //iterate through bookings array and find the room number, for each room number map the approrpiate room into a new array
    return userBookings.map(booking => rooms[booking.roomNumber - 1])
}

const calcTotalBookingsCost = (rooms, userBookings) => {
    return userBookings
    .map(booking => booking.roomNumber)
    .reduce((total, roomNumber) => {
        return total += rooms[roomNumber-1].costPerNight
    },0)
};

const findAvailableRooms = (date, bookings, rooms) => {

let bookedRooms = bookings.filter(booking => booking.date === date).map(booking => booking.roomNumber)

let availableRooms = rooms.filter(room => !bookedRooms.includes(room.number))

if (availableRooms.length === 0){
    return `It looks like there are no rooms available on ${date}! Please select a different date :)`
} else {
    return availableRooms
}

}

const filterRoomsByType = (availableRooms, type) => {

    let filteredRooms = availableRooms.filter(room => room.roomType === type.toLowerCase())

    if (filteredRooms.length === 0) {
        return `There are no ${type}'s available on this date. Try changing your search date or room type.`
    } else {
        return filteredRooms
    }
}

export {
    checkPassword,
    checkUsername,
    findUserBookings,
    convertBookingsToRooms,
    calcTotalBookingsCost,
    findAvailableRooms,
    filterRoomsByType
}