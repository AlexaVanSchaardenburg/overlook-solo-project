const checkLoginInfo = (username, password) => {
    //not sure if I even need this function
    //given username and password checks if username is customer(num 1-50) and password if overlook2021
}

const findUserBookings = (user) => {
    //looks through all bookings and filters out only the ones for that user
    //data needed = bookings
    //returns array of usersBookings
}

const calcTotalBookingsCost = (userBookings) => {
    //given all userBookings calculates the total spent on bookings 
    //data needed = rooms 
}

const findAvailableRooms = (date) => {
    //given a date filter all the rooms to include only those that are not booked on that date
        //iteratet through bookingd array to filter out rooms that are booked for date 
            //(bookings.filter(booking => booking.date !== date))???
        rooms.filter(room => {
            return bookings.forEach(booking => {
                if (booking.roomNumber === room.number && booking.date !== date){
                    return true
                } else {
                    return false
                }
            })
        })
        //above code goes through rooms array and for each room checks all of the bookings, if a booking is equal to that room number AND the booking date is NOT the date then the room is available
        //feel like I am missing some logic here for if the booking.roomNumber does not exisit at all
            //maybe could do a find to make sure that each booking exisists at least once and if it doesn't then don't do the forEach and just return true? 
            rooms.filter(room => {
                if (bookings.find(booking => booking.roomNumber === room.number)){
                    return true
                } else {
                    bookings.forEach(booking => {
                        if (booking.roomNumber === room.number && booking.date !== date){
                            return true
                        } else {
                            return false
                        }
                    })
                }})
    //data needed = rooms, bookings
    //return array of rooms
}

const filterRoomsByType = (availableRooms, type) => {
    //given array of rooms, filter those rooms by the given type
    //return array of 
}

export {
    checkLoginInfo,
    findUserBookings,
    calcTotalBookingsCost,

}