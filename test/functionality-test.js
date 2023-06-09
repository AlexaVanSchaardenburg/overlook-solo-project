import chai from 'chai';
const expect = chai.expect;
const {} = require('./sample-data.js');
const {checkPassword, findUserBookings, calcTotalBookingsCost, findAvailableRooms, filterRoomsByType} = require('../src/functionality.js');

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
    it('', function() {
    });
  });

describe(`Calculate the total spent by the user on bookings`, function() {
it('', function() {
});
});

describe(`Find available rooms on a specific date`, function() {
it('', function() {
});
});

describe(`Finnd rooms by type`, function() {
it('', function() {
});
});