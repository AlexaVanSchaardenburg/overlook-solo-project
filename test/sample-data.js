let rooms = [
    {"number":1,"roomType":"residential suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":358.4},
    {"number":2,"roomType":"suite","bidet":false,"bedSize":"full","numBeds":2,"costPerNight":477.38},
    {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
    {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
    {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17}
]

let bookings = [
    {"id":"5fwrgu4i7k55hl6sz","userID":2,"date":"2022/04/22","roomNumber":5},{"id":"5fwrgu4i7k55hl6t5","userID":2,"date":"2022/01/24","roomNumber":4},{"id":"5fwrgu4i7k55hl6t6","userID":1,"date":"2022/01/24","roomNumber":2},{"id":"5fwrgu4i7k55hl6t7","userID":2,"date":"2022/02/16","roomNumber":3},{"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2022/02/05","roomNumber":2}
]

let bookings2 = [
    {"id":"5fwrgu4i7k55hl6sz","userID":2,"date":"2022/01/01","roomNumber":5},{"id":"5fwrgu4i7k55hl6t5","userID":2,"date":"2022/01/01","roomNumber":4},{"id":"5fwrgu4i7k55hl6t6","userID":1,"date":"2022/01/01","roomNumber":2},{"id":"5fwrgu4i7k55hl6t7","userID":2,"date":"2022/01/01","roomNumber":3},{"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2022/01/01","roomNumber":1}
]

export {
    rooms, 
    bookings,
    bookings2
}