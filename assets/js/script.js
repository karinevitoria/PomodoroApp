let studytime1 = false;
let breaktime1 = false;
let sprints = 0;

$("#timeSession").text(changeNumber(25));
$("#timeBreak").text(changeNumber(5));
$("#timer").text("00:10");

function startmode() {
    $('#start').show();
    $('#pause').hide();
    $('#resume').hide();
    $('#reset').hide();
    $('#sbreak').hide();
    $('#lbreak').hide();
    $('#title').html("Study with the pomodoro technique. :)");
}
function breakmode() {
    $('#start').hide();
    $('#resume').hide();
    $('#pause').hide();
    $('#reset').hide();
    $('#sbreak').show();
    $('#lbreak').hide();
    $('#title').html("Congrats on finishing your session! Do you want to start your break?");
}
function longBreak() {
    $('#start').hide();
    $('#resume').hide();
    $('#pause').hide();
    $('#reset').hide();
    $('#sbreak').show();
    $('#lbreak').show();
}
function studytime() {
    $('#start').hide();
    $('#resume').hide();
    $('#pause').show();
    $('#reset').show();
    $('#sbreak').hide();
    $('#lbreak').hide();
    $('#title').text("Hey! It's time to focus. You can do it! Good luck.");
}
function breaktime() {
    $('#start').hide();
    $('#resume').hide();
    $('#pause').show();
    $('#reset').show();
    $('#sbreak').hide();
    $('#lbreak').hide();
}
function studypause() {
    $('#start').hide();
    $('#resume').show();
    $('#pause').hide();
    $('#reset').show();
    $('#sbreak').hide();
    $('#lbreak').hide();
}

startmode();

function changeNumber(num) {
    if (num < 10) {
        return num = "0" + num;
    } else {
        return num;
    }
}

function changeTime(mode, place) {
    if (place == "session") {
        valuePlace = $("#timeSession").text()
        valuePlace = parseInt(valuePlace)
    } else if (place == "break") {
        valuePlace = $("#timeBreak").text()
        valuePlace = parseInt(valuePlace)
    }

    if (mode == "add") {
        valuePlace += 5;
    } else if (mode == "minus") {
        if (valuePlace > 5) {
            valuePlace -= 5;
        } else {
            valuePlace = 0;
        }
    }

    if (place == "session") {
        $("#timeSession").text(changeNumber(valuePlace))
        if (breaktime1 == false) { $("#timer").text(changeNumber(valuePlace) + ":00"); }
        if (valuePlace == 25) {
            $("#timeBreak").text(changeNumber(5));
        } else if (valuePlace == 45) {
            $("#timeBreak").text(changeNumber(15));
        } else if (valuePlace == 50) {
            $("#timeBreak").text(changeNumber(10));
        }
    } else if (place == "break") {
        $("#timeBreak").text(changeNumber(valuePlace))
        if (breaktime1 == true) { $("#timer").text(changeNumber(valuePlace) + ":00"); }
    }
}

function startStudying() {
    studytime();
    studytime1 = true;
    timerStart();
}

function timerStart() {
    intervalTimer = setInterval(() => {
        valueTimer = $("#timer").text();

        valueTimer = valueTimer.split(":");
        valueMinutes = parseInt(valueTimer[0]);
        valueSeconds = parseInt(valueTimer[1]);


        if (valueSeconds == 0) {
            valueMinutes -= 1;
            valueSeconds = 59;
        }
        else {
            valueSeconds -= 1;
        }

        $("#timer").text(changeNumber(valueMinutes) + ":" + changeNumber(valueSeconds));

        breakOrStudy();
    }, 1000);
}

function timerPause() {
    clearInterval(intervalTimer);
    studypause();
}

function setResumeMode() {
    timerStart();
    studytime();
}

function resetTime() {
    startmode();
    clearInterval(intervalTimer);
    let initialSession = $("#timeSession").text();
    $("#timer").text(initialSession + ":00");
}

function startBreak() {
    breaktime();
    timerStart();
}

function breakOrStudy() {
    //the studytime is now over (break time)
    if (valueMinutes == 0 && valueSeconds == 0 && studytime1 == true && breaktime1 == false) {
        breakmode();
        // $("#timer").text(changeNumber(parseInt($("#timeBreak").text())) + ":00");
        $("#timer").text("00:10");
        studytime1 = false;
        breaktime1 = true;
        clearInterval(intervalTimer);
    }
    //the breaktime is now over (study time)
    else if (valueMinutes == 0 && valueSeconds == 0 && breaktime1 == true) {
        startmode();
        // $("#timer").text(changeNumber(parseInt($("#timeSession").text())) + ":00");
        $("#timer").text("00:10");
        sprints += 1;
        studytime1 = true;
        breaktime1 = false;
        clearInterval(intervalTimer);
    }
}

//modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}