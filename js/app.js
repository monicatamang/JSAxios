// ---------- RANDOM ACTIVITY ----------

// Creating a function that is called if the network is done and there are no errors
function randomActivitySuccess(res) {
    
    // Storing the returned JavaScript object into a variable
    let randomActivity = res.data;

    // Printing the activity to the user
    let activity = `<p>${randomActivity.activity}</p>`;
    document.getElementById(`randomActivity`).innerHTML = activity;
}

// Creating a function that is called if the page errors, printing an error message to the user
function randomActivityFailure(err) {
    document.getElementById(`randomActivityContainer`).innerHTML += `Sorry, something went wrong. Failure to receive activity`;
}

// Creating a function that is called when the user clicks on the button
function getRandomActivity() { 

    // Configuring the request with the type and URL and then sending the request when the button is clicked
    // If the request doesn't fail, it will call the randomActivitySuccess function
    // If the request fails, it will call the randomActivityFailure function
    axios.request({
        method: `GET`,
        url: `http://www.boredapi.com/api/activity/`
    }).then(randomActivitySuccess).catch(randomActivityFailure);
}

// Adding a click event to the random activity button and calling the function that will send a GET request and print the activity to the user
let randomActivityButton = document.getElementById(`randomActivityButton`);
randomActivityButton.addEventListener(`click`, getRandomActivity);

// ---------- PARTICIPANTS ----------

// Creating a function that is called if the network is done and there are no errors
function participantsSuccess(res) {

    // Storing the returned JavaScript object into a variable, printing the activity to the user based on the number of participants selected
    let participantsActivities = res.data;
    document.getElementById(`participantsActivityResult`).innerText = participantsActivities.activity;

    // If the user does not select an option, print a message telling the user to select the number of participants from the dropdown menu
    if (participantsSelection.value === "") {
        document.getElementById(`participantsActivityResult`).innerText = `Please select the number of participants.`;
    }
}

// Creating a function that is called if the page errors, printing an error message to the user
function participantsFailure(err) {
    document.getElementById(`participantsContainer`).innerHTML += `Sorry, something went wrong. Failure to receive activity.`;
}

// Creating a function that is called when the user clicks on the button
function getParticipantActivity() {

    // Configuring the request with the type and URL
    // Sending the request along with a parameter which is the number of participants the user has selected from the dropdown menu
    // If the request doesn't fail, it will call the participantsSuccess function
    // If the request fails, it will call the participantsFailure function
    axios.request({
        method: `GET`,
        url: `http://www.boredapi.com/api/activity`,
        params: {
            participants: participantsSelection.value
        }
    }).then(participantsSuccess).catch(participantsFailure);
}

// Setting the dropdown menu as a global variable
let participantsSelection = document.getElementById(`participantsSelection`);

// Adding a click event to the get activity button and calling the function that will send a GET request and print the activity to the user based on the number of participants they have selected
let getActivityButton = document.getElementById(`getActivityButton`);
getActivityButton.addEventListener(`click`, getParticipantActivity);