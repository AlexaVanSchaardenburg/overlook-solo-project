//fetch user on login, fetch all bookings and invoke display user bookings on page load
//fetch available rooms on 

//need to import any functions from domUpdates that will manipulate fetched data
let userData, roomsData, bookingsData;

const userResponse = fetch(`http://localhost:3001/api/v1/customers/${//put user id here
}`).then((response) => {
  if(!response.ok) {
    throw new Error(`${response.status}`)
  } else {
    return response.json();
  }
}).catch(error => alert(`${error.message}`));

const roomsResponse = fetch('http://localhost:3001/api/v1/rooms').then((response) => {
  if(!response.ok) {
    throw new Error(`${response.status}`)
  } else {
    return response.json();
  }
}).catch(error => alert(`${error.message}`));

const bookingsResponse = fetch('http://localhost:3001/api/v1/bookings').then((response) => {
    if(!response.ok) {
      throw new Error(`${response.status}`)
    } else {
      return response.json();
    }
  }).catch(error => alert(`${error.message}`));

  window.addEventListener('load', () => {
    Promise.all([userResponse, roomsResponse, bookingsResponse]).then(([user, rooms, bookings]) => {
    
    userData = user.user
    roomsData = rooms.rooms
    bookingsData = bookings.bookings

    //instead of doing rooms and bookings here do them on click of the login button to display data - then it should be available to the page when the user selects a date
    
    // showRecipesPage();
    // user = selectRandomUser(usersData);
    // displayAllRecipes(recipeData);
    // return user;
    })});

    window.addEventListener('load', () => {
        Promise.all([userResponse, roomsResponse, bookingsResponse]).then(([user, rooms, bookings]) => {
        
        userData = user.user
        roomsData = rooms.rooms
        bookingsData = bookings.bookings
    
        //instead of doing rooms and bookings here do them on click of the login button to display data - then it should be available to the page when the user selects a date
        
        // showRecipesPage();
        // user = selectRandomUser(usersData);
        // displayAllRecipes(recipeData);
        // return user;
        })});

  //need to export all data in final updated form to be used in sccripts file