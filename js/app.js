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
    document.getElementById(`randomActivity`).innerText = `Sorry, something went wrong. Failed to receive activity. Please try again.`;
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
    document.getElementById(`participantsActivityResult`).innerText = `Sorry, something went wrong. Failed to receive activity. Please try again.`;
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
    document.getElementById(`categoryActivityResult`).innerText = `Sorry, something went wrong. Failed to receive activity. Please try again.`;
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

// Creating a function that is called if the network is done and there are no errors
function priceRangeSuccess(res) {

    // Storing the returned JavaScript object into a variable
    let priceRangeActivities = res.data;

    // Getting the p tag that will be manipulated to print messages to the user
    let priceRangeActivityResult = document.getElementById(`priceRangeActivityResult`);
    
    // Storing the user's minimum and maximum values as variables
    let minPrice = document.getElementById(`minPrice`).value;
    let maxPrice = document.getElementById(`maxPrice`).value;

    // If the user enters a valid price range, print the activity to the user
    if (minPrice < maxPrice) {
        priceRangeActivityResult.innerText = priceRangeActivities.activity;
    } 
    
    // If the user enters a valid price range but returned data does not have an activity at the that price range, print an error message to the user
    else if (priceRangeActivities.price === undefined) {
        priceRangeActivityResult.innerText = `No activity found at this price range. Please enter another value.`;
    }

    // If the user has not entered a minimum or maximum price, prompt the user to enter a minimum and maxmimum value.
    if (minPrice === "" && maxPrice === "") {
        priceRangeActivityResult.innerText = `Please enter a minimum and maximum price range.`;
    }

    // If the user entered a maximum price but not a minimum price, set the minimum price to 0 and print the activity between 0 and the user's maximum input price
    else if (minPrice === "") {
        minPrice = 0;
        priceRangeActivityResult.innerText = priceRangeActivities.activity;
    } 
    
    // If the user entered a minimum price but not a maximum price, set the maximum price to 1 and print the activity between the user's minimum input price and 1
    else if (maxPrice === "") {
        maxPrice = 1;
        priceRangeActivityResult.innerText = priceRangeActivities.activity;
    }

    // If the minimum price or maximum price is a negative number or the minimum price is a negative but the maximum price is greater than or equal to 0, print a error message to the user
    if (minPrice < 0 || maxPrice < 0 || (minPrice < 0 && maxPrice >= 0)) {
        priceRangeActivityResult.innerText = `Invalid price value. Please enter another value.`;
    }

    // If the minimum price or maximum price is greater than the maximum price range of 1, print an error message to the user
    else if (minPrice > 1 || maxPrice > 1) {
        priceRangeActivityResult.innerText = `The input value has exceeded the maximum price range. Please enter another value.`;
    }
}

// Creating a function that is called if the page errors, printing an error message to the user
function priceRangeFailure(err) {
    priceRangeActivityResult.innerText = `Sorry, something went wrong. Failed to recieve activity. Please try again.`;
}

// Creating a function that is called when the user clicks on the button
function getActivityBasedOnPriceRange(e) {

    // Storing the user's minimum price and maximum price input value as variables
    let minPrice = document.getElementById(`minPrice`).value;
    let maxPrice = document.getElementById(`maxPrice`).value;

    // When the button is clicked, configure the request with the type and URL with the value of the parameters being the minimum and maximum price range the user has entered
    // If the request doesn't fail, it will call the priceRangeSuccess function
    // If the request fails, it will call the priceRangeFailure function
    axios.request({
        method: `GET`,
        url: `http://www.boredapi.com/api/activity`,
        params: {
            minprice: minPrice,
            maxprice: maxPrice
        }
    }).then(priceRangeSuccess).catch(priceRangeFailure);
}

// Adding a click event to the button and calling the function that will send a GET request and print the activity to the user based on the user's minimum and maximum price range
let priceRangeActivityButton = document.getElementById(`priceRangeActivityButton`);
priceRangeActivityButton.addEventListener(`click`, getActivityBasedOnPriceRange);

// ---------- BONUS: ACCESSIBILITY VALUES ----------

// Creating a function that will print the accessibility value the user has selected when they move the slider
function showAccessibilitySelected(e) {
    document.getElementById(`accessibility`).innerText = `Accessibility: ${accessibilitySelected.value}`;
}

// // Creating a function that is called if the network is done and there are no errors
function accessibilitySuccess(res) {

    // Storing the returned JavaScript object into a variable
    let accessibilityActivities = res.data;

    // Printing the activity to the user based on the accessibility value the user has selected
    let result = document.getElementById(`accessibilityActivityResult`);
    result.innerText = accessibilityActivities.activity;

    // If returned data does not have an activity at the selected accessibility value, print an error message to the user
    if (accessibilityActivities.price === undefined) {
        result.innerText = `No activity found at this accessibility value. Please select another value.`;
    }

    // Since the default value of the slider is 0.5, the showAccessibilitySelected function will be called to print the accessibility default value even if the user clicks on the button and has not selected an accessibility value
    showAccessibilitySelected();
}

// Creating a function that is called if the page errors, printing an error message to the user
function accessibilityFailure(err) {
    document.getElementById(`accessibilityActivityResult`).innerText = `Sorry, something went wrong. Failed to recieve an activity. Please try again.`;
}

// Creating a function that is called when the user clicks on the button
function getActivityBasedOnAccessibility(e) {

    // When the button is clicked, configure the request with the type and URL with the value of the parameter being the accessibility value the user has selected
    // If the request doesn't fail, it will call the priceRangeSuccess function
    // If the request fails, it will call the priceRangeFailure function
    axios.request({
        method: `GET`,
        url: `http://www.boredapi.com/api/activity`,
        params: {
            accessibility: accessibilitySelected.value
        }
    }).then(accessibilitySuccess).catch(accessibilityFailure);
}

// Adding a click event to the button and calling the function that will send a GET request and print the activity to the user based on the user's selected accessibility value
let accessibilityActivityButton = document.getElementById(`accessibilityActivityButton`);
accessibilityActivityButton.addEventListener(`click`, getActivityBasedOnAccessibility);

// Adding a input event to the slider and calling the function that will print the selected accessibility values to the user
let accessibilitySelected = document.getElementById(`accessibilityInput`);
accessibilitySelected.addEventListener(`input`, showAccessibilitySelected);