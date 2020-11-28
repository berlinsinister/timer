$(document).ready(function () {
    let min = 25;
    let sec = 0;
    let breakMin = 5;
    let breakSec = 0;
    let delay = 500;
    let launch = false;
    let sessionSwitch = true;
    let breakSwitch = false;

    let timeLeft = $('#time-left');
    let startStop = $('#start_stop');
    let reset = $('#reset');
    let timerLabel = $('#timer-label');
    let sessionDecrement = $('#session-decrement');
    let sessionLength = $('#session-length');
    let sessionLengthValue = sessionLength.html();
    let sessionIncrement = $('#session-increment');
    let breakDecrement = $('#break-decrement');
    let breakLength = $('#break-length');
    let breakLengthValue = breakLength.html();
    let breakIncrement = $('#break-increment');
    let audio = $('#beep')[0];

    timeLeft.html(min + ':' + '00');
    // timeLeft.addClass('time-left-release');
    startStop.addClass('release');
    reset.addClass('release');
    timerLabel.html('session');

    sessionDecrement.click(function () {
        sessionLengthValue = sessionLength.html();
        if (launch === false) {
            sessionLengthValue--;
            if (sessionLengthValue <= 0)
                sessionLengthValue = 1;
            sessionLength.html(sessionLengthValue);
            min = sessionLengthValue;
            sec = 0;
            timeLeft.html(((min < 10) ? '0' + min : min) + ':' + '00');
        }
    });

    sessionIncrement.click(function () {
        if (launch === false) {
            sessionLengthValue = sessionLength.html();
            sessionLengthValue++;
            if (sessionLengthValue > 60)
                sessionLengthValue = 60;
            sessionLength.html(sessionLengthValue);
            min = sessionLengthValue;
            sec = 0;
            timeLeft.html(((min < 10) ? '0' + min : min) + ':' + '00');
        }
    });

    breakDecrement.click(function () {
        breakLengthValue = breakLength.html();
        if (launch === false) {
            breakLengthValue--;
            if (breakLengthValue <= 0)
                breakLengthValue = 1;
            breakLength.html(breakLengthValue);
            breakMin = breakLengthValue;
            breakSec = 0;
        }
    });

    breakIncrement.click(function () {
        breakLengthValue = breakLength.html();
        if (launch === false) {
            breakLengthValue++;
            if (breakLengthValue > 60)
                breakLengthValue = 60;
            breakLength.html(breakLengthValue);
            breakMin = breakLengthValue;
            breakSec = 0;
        }
    });

    startStop.click(function () {
        launch = !launch;
        let stop = setInterval(() => {
            if (launch === false) {
                // timeLeft.addClass('time-left-release');
                // timeLeft.removeClass('time-left-press');
                startStop.addClass('release');
                startStop.removeClass('press');
                clearInterval(stop);
            } else {
                if (sessionSwitch === true) {
                    if (min === sessionLengthValue)
                        timeLeft.html(((min < 10) ? '0' + min : min) + ':' + '00');
                    else
                        timeLeft.html(((min < 10) ? '0' + min : min) + ':' + ((sec === 60) ? '00' : (sec < 10) ? '0' + sec : sec));

                    if (min > 0 && sec === 0) {
                        sec = 60;
                        min--;
                    }
                    sec--;

                    if (min === 0 && sec === -2) { // switch to break case // -1 because of overlap;
                        timerLabel.html('break');
                        breakMin = breakLengthValue;
                        breakSec = 0;
                        sessionSwitch = false;
                        breakSwitch = true;
                        audio.play();
                    }
                }

                if (breakSwitch === true) {
                    if (breakMin == breakLengthValue)
                        timeLeft.html(((breakMin < 10) ? '0' + breakMin : breakMin) + ':' + '00');
                    else
                        timeLeft.html(((breakMin < 10) ? '0' + breakMin : breakMin) + ':' + ((breakSec === 60) ? '00' : (breakSec < 10) ? '0' + breakSec : breakSec));

                    if (breakMin > 0 && breakSec === 0) {
                        breakSec = 60;
                        breakMin--;
                    }
                    breakSec--;

                    if (breakMin === 0 && breakSec === -1) { // switch to session case
                        timerLabel.html('session');
                        min = sessionLengthValue;
                        sec = 0;
                        sessionSwitch = true;
                        breakSwitch = false;
                        audio.play();
                    }
                }

                // timeLeft.addClass('time-left-press');
                // timeLeft.removeClass('time-left-release');
                startStop.addClass('press');
                startStop.removeClass('release');
            }
            // reseting while countdown;
            reset.click(function () {
                // timeLeft.addClass('time-left-release');
                // timeLeft.removeClass('time-left-press');
                startStop.addClass('release');
                startStop.removeClass('press');

                reset.addClass('press');
                reset.removeClass('release');
                setTimeout(() => {
                    reset.addClass('release');
                    reset.removeClass('press');
                }, 200);

                resetFunction();
                clearInterval(stop);
            });
        }, delay);
    });
    // reset pressed separately
    reset.click(function () {
        reset.addClass('press');
        reset.removeClass('release');
        setTimeout(() => {
            reset.addClass('release');
            reset.removeClass('press');
        }, 200);

        resetFunction();
    });

    function resetFunction() {
        min = 25;
        sec = 0;
        breakMin = 5;
        breakSec = 0;
        launch = false;
        timeLeft.html(min + ':' + '00');
        timerLabel.html('session');
        sessionLength.html(min);
        breakLength.html(breakMin);
        sessionLengthValue = min;
        breakLengthValue = breakMin;
        sessionSwitch = true;
        breakSwitch = false;
        audio.pause();
        audio.currentTime = 0;
    }
});