const checkPassword = (password) => {
  if (password === 'overlook2021') {
        return true
    } else {
        return false
    }
};

const checkUsername = (username) => {
    if(username){
       let id = username.split('').splice(8).join('')
       return id
    } else {
        return `Please enter your username`
    }
}

const findUserBookings = (user, bookings) => {
    return bookings.filter(booking => booking.userID === user.id)
}

const calcTotalBookingsCost = (rooms, userBookings) => {
    return userBookings
    .map(booking => booking.roomNumber)
    .reduce((total, roomNumber) => {
        return total += rooms[roomNumber-1].costPerNight
    },0)
}

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
    calcTotalBookingsCost,
    findAvailableRooms,
    filterRoomsByType
}