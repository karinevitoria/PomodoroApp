let startmode = true;
let breakmode = false;
let longerbreak = false;
let studytime = false;
let studypause = false;
let pauseStudy = false;
let breaktime = false;
let sprints = 0;

$("#timeSession").text(changeNumber(25));
$("#timeBreak").text(changeNumber(5));
$("#timer").text("00:10");

function whichMode() {
    if (startmode == true) {
        $('#start').show();
        $('#pause').hide();
        $('#resume').hide();
        $('#reset').hide();
        $('#sbreak').hide();
        $('#lbreak').hide();
    } else if (breakmode == true) {
        $('#start').hide();
        $('#resume').hide();
        $('#pause').hide();
        $('#reset').hide();
        $('#sbreak').show();
        $('#lbreak').hide();
    } else if (longerbreak == true) {
        $('#start').hide();
        $('#resume').hide();
        $('#pause').hide();
        $('#reset').hide();
        $('#sbreak').show();
        $('#lbreak').show();
    } else if (studytime == true) {
        $('#start').hide();
        $('#resume').hide();
        $('#pause').show();
        $('#reset').show();
        $('#sbreak').hide();
        $('#lbreak').hide();
    } else if (breaktime == true) {
        $('#start').hide();
        $('#resume').hide();
        $('#pause').show();
        $('#reset').show();
        $('#sbreak').hide();
        $('#lbreak').hide();
    } else if (studypause == true) {
        $('#start').hide();
        $('#resume').show();
        $('#pause').hide();
        $('#reset').show();
        $('#sbreak').hide();
        $('#lbreak').hide();
    }
}

whichMode();

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
        $("#timer").text(changeNumber(valuePlace) + ":00");
    } else if (place == "break") {
        $("#timeBreak").text(changeNumber(valuePlace))
    }
}

function timerStart() {
    if (pauseStudy == false) {
        studypause = false;
        startmode = false;
        studytime = true;
        whichMode();

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

        if (valueMinutes == 0 && valueSeconds == 0 && studytime == true) {
            breakmode = true;
            studytime = false;
            pauseStudy = true;
            whichMode();
            console.log
            // $("#timer").text(changeNumber(parseInt($("#timeBreak").text())) + ":00");
            $("#timer").text("00:10");
            console.log(breaktime)
            console.log(studytime)
        } else if (valueMinutes == 0 && valueSeconds == 0 && breaktime == true) {
            console.log('entrei aqui')
            breaktime = false;
            pauseStudy = true;
            startmode = true;
            whichMode();
            // $("#timer").text(changeNumber(parseInt($("#timeSession").text())) + ":00");
            $("#timer").text("00:10");
            sprints += 1;
        }
    } else if (studypause == true) {
        timerPause();
    }
}

function timerPause() {
    studytime = false;
    pauseStudy = true;
    studypause = true;
    whichMode();
}

function setResumeMode() {
    studypause = false;
    pauseStudy = false;
    studytime = true;
    whichMode();
}

function resetTime() {
    startmode = true;
    studytime = false;
    pauseStudy = true;
    studypause = false;
    studymode = false;
    whichMode();
    let initialSession = $("#timeSession").text();
    $("#timer").text(initialSession + ":00");
}

function startBreak() {
    pauseStudy = false;
    breaktime = true;
    breakmode = false;
    whichMode();
}