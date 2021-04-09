// ---------- RANDOM ACTIVITY ----------

function randomActivitySuccess(res) {
    
    let randomActivity = res.data;

    let activity = `<p>${randomActivity.activity}</p>`;
    document.getElementById(`randomActivity`).innerHTML = activity;
}

function randomActivityFailure(err) {
    document.getElementById(`randomActivityContainer`).innerHTML += `Sorry, something went wrong. Failure to receive activity`;
}

function getRandomActivity(e) {
    axios.request({
        method: `GET`,
        url: `http://www.boredapi.com/api/activity/`
    }).then(randomActivitySuccess).catch(randomActivityFailure);
}

let randomActivityButton = document.getElementById(`randomActivityButton`);
randomActivityButton.addEventListener(`click`, getRandomActivity);

// ---------- PARICIPANTS ----------

function participantsSuccess(res) {

    let participantsActivities = res.data;

    document.getElementById(`participantsContainer`).innerHTML += `<p>${participantsActivities.activity}</p>`; 
    console.log(participantsActivities.participants);
    console.log(participantsSelection.value);
}

function participantsFailure(err) {
    document.getElementById(`participantsContainer`).innerHTML += `Sorry, something went wrong. Failure to receive activity`;
}

function getParticipantActivity() {
    axios.request({
        method: `GET`,
        url: `http://www.boredapi.com/api/activity`,
        params: {
            participants: participantsSelection.value
        }
    }).then(participantsSuccess).catch(participantsFailure);
}

let getActivityButton = document.getElementById(`getActivityButton`);
getActivityButton.addEventListener(`click`, getParticipantActivity);

let participantsSelection = document.getElementById(`participantsSelection`);