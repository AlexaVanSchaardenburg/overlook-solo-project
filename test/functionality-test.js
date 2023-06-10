import chai from 'chai';
const expect = chai.expect;
const {rooms, bookings, bookings2} = require('./sample-data.js');
const {checkPassword, findUserBookings, calcTotalBookingsCost, findAvailableRooms, filterRoomsByType} = require('../src/functionality.js');

let user1, user2, user3

beforeEach(function() {
    user1 = {id: 1, name: 'Cilantro'}
    user2 = {id: 2, name: 'Pepper'}
    user3 = {id: 6, name: 'Colin'}
});

describe('Password check', function() {
    it('Should return true if password is overlook2021', function() {
        let correctPassword = checkPassword('overlook2021')

        expect(correctPassword).to.equal(true)
    });
    it('Should return false if password is not overlook2021', function() {
        let incorrectPassword = checkPassword('gabblygook')
        
        expect(incorrectPassword).to.equal(false)
    });
    it('Should return false if password is undefined', function() {
        let noPassword = checkPassword()
        
        expect(noPassword).to.equal(false)
    });
});

describe(`Find user's bookings`, function() {
    it('Should return an array of bookings with userID: 1', function() {
        let userBookings1 = findUserBookings(user1, bookings)

        expect(userBookings1).to.deep.equal([{"id":"5fwrgu4i7k55hl6t6","userID":1,"date":"2022/01/24","roomNumber":2}, {"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2022/02/05","roomNumber":2}])
    });
    it('Should return an array of bookings with userID: 2', function() {
        let userBookings2 = findUserBookings(user2, bookings)

        expect(userBookings2).to.deep.equal([{"id":"5fwrgu4i7k55hl6sz","userID":2,"date":"2022/04/22","roomNumber":5},{"id":"5fwrgu4i7k55hl6t5","userID":2,"date":"2022/01/24","roomNumber":4},{"id":"5fwrgu4i7k55hl6t7","userID":2,"date":"2022/02/16","roomNumber":3}])
    });
  });

describe(`Calculate the total spent by the user on bookings`, function() {
    it('Should calculate the total spent by a user on all their bookings', function() {
        let userBookings1 = findUserBookings(user1, bookings)
        let totalSpentBy1 = calcTotalBookingsCost(rooms, userBookings1)

        expect(totalSpentBy1).to.equal(954.76)
    });
    it('Should calculate the total spent by a different user on all their bookings', function() {
        let userBookings2 = findUserBookings(user2, bookings)
        let totalSpentBy2 = calcTotalBookingsCost(rooms, userBookings2)

        expect(totalSpentBy2).to.equal(1260.75)
    });
    it('Should return 0 if user has no bookings', function() {
        let userBookings3 = findUserBookings(user2, bookings)
        let noneSpent = calcTotalBookingsCost(rooms, userBookings3)

        expect(noneSpent).to.equal(0.00)
    });
});

describe(`Find available rooms on a specific date`, function() {
    it.skip('Should return an array of rooms available given a date', function() {
        let availableRooms = findAvailableRooms('2022/04/22', bookings)

        expect(availableRooms).to.deep.equal([
            {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},{"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
            {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
            {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44}
        ])
    });
    it.skip('Should return an array of rooms available given a different date', function() {
        let availableRooms = findAvailableRooms('2022/01/24', bookings)

        expect(availableRooms).to.deep.equal([
            {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
            {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
            {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17}
        ])
    });
    it.skip('Should return a message if no rooms are avialable', function() {
        let availableRooms = findAvailableRooms('2022/01/01', bookings2)

        expect(availableRooms).to.equal(`It looks like there are no rooms available on Jan 1st, 2022! Please select a different date :)`)
    });
});

describe(`Find rooms by type`, function() {

    let availableRooms
    beforeEach(function() {
        availableRooms = findAvailableRooms('2022/01/24', bookings)
    })

    it.skip('Should return an array of rooms given the type and available rooms', function() {
        let filteredRooms1 = filterRoomsByType(availableRooms, 'Residential Suite')

        expect(filteredRooms1).to.deep.equal([{"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4}])
    });
    it.skip('Should return an array of rooms given a different type and available rooms', function() {
        let filteredRooms2 = filterRoomsByType(availableRooms, 'Single Room')

        expect(filteredRooms2).to.deep.equal([{"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
        {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17}])
    });
    it.skip('If no rooms of that type are available it should return an apology message', function() {
        let filteredRooms3 = filterRoomsByType(availableRooms, 'Junior')

        expect(filteredRooms3).to.equal(`There are no Junior's available on this date. Try changing your search date or room type.`)
    });

});