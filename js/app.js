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
    document.getElementById(`randomActivityContainer`).innerHTML += `Sorry, something went wrong. Failed to receive activity. Please try again.`;
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
    document.getElementById(`participantsContainer`).innerHTML += `Sorry, something went wrong. Failed to receive activity. Please try again.`;
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

// ---------- BONUS: CATEGORIES ----------

// Creating a function that is called if the network is done and there are no errors
function categorySuccess(res) {

    // Storing the returned JavaScript object into a variable, printing the activity to the user based on the user's category selection
    let categoryActivities = res.data;
    document.getElementById(`categoryActivityResult`).innerText = categoryActivities.activity;
}

// Creating a function that is called if the page errors, printing an error message to the user
function categoryFailure(err) {
    document.getElementById(`categoryContainer`).innerHTML += `Sorry, something went wrong. Failed to receive activity. Please try again.`;
}

// Creating a function that is called when the user clicks on the button
function getActivityBasedOnCategory(e) {

    // Getting all the inputs that have the same class name and checking to see if the input is checked
    let category = document.getElementsByClassName(`categoryInput`);
    for (let i = 0; i < category.length; i++) {

        // If the input is checked, configure the request with the type and URL with the value of the parameter being the input the user has selected
        // If the request doesn't fail, it will call the categorySuccess function
        // If the request fails, it will call the categoryFailure function
        if (category[i].checked) {
            axios.request({
                method: `GET`,
                url: `http://www.boredapi.com/api/activity`,
                params: {
                    type: category[i].value
                }
            }).then(categorySuccess).catch(categoryFailure);
        }
    }
}

// Adding a click event to the category activity button and calling the function that will send a GET request and print the activity to the user based the user's category selection
let categoryActivityButton = document.getElementById(`categoryActivityButton`);
categoryActivityButton.addEventListener(`click`, getActivityBasedOnCategory);

// ---------- BONUS: PRICE RANGES ----------