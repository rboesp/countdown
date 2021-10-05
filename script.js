// const daysEl = document.getElementById("days")
// const hoursEl = document.getElementById("hours")
// const minutesEl = document.getElementById("minutes")
// const secondsEl = document.getElementById("seconds")
// console.log(daysEl, hoursEl, minutesEl, secondsEl)

//KNOWN CONSTANTS

/*
Used to know which time period to reduce
when a lower time period has reached 0
Ex: After hours has reached 0, reduce days 
*/
const timeLabelOrderUp = {
    SS: "MM",
    MM: "HH",
    HH: "DD",
}

/*
Used to know which lower time period to reset 
when a higher time period has been reduced
Ex: After reducing minutes, reet seconds
*/
const timeLabelOrderDown = {
    DD: "HH",
    HH: "MM",
    MM: "SS",
}

const timeValueResets = {
    SS: 60, //secs in min (one sec is reduced right away so shows as 59)
    MM: 59, //mins in hrs -1
    HH: 23, //hrs in days -1
    //no reset for days because no months in countdown
}

/*FUNCTIONS */

// const render = (time, count) => (document.getElementById(time).innerHTML = count)

const reduce = (timeLabel) => {
    if (timeValues[timeLabel]) {
        timeValues[timeLabel]--

        //recursively reset all times lower
        return reset(timeLabelOrderDown[timeLabel])
    }

    reduce(timeLabelOrderUp[timeLabel])
}

const stopInterval = (i) => {
    console.log("done!")
    clearInterval(i)
}

const over = () => {
    // console.log(timeValues)
    return !timeValues.DD && !timeValues.HH && !timeValues.MM && !timeValues.SS
}

const reset = (timeLabel) => {
    timeValues[`${timeLabel}`] = timeValueResets[timeLabel]
    if (timeLabel !== "SS") reset(timeLabelOrderDown[timeLabel])
}

const startInterval = () => {
    log(timeValues)

    const i = setInterval(() => {
        if (!timeValues.SS) {
            //seconds ran out, reduce minute and work
            //up from there if they also ran out
            reduce(timeLabelOrderUp["SS"])
        }

        timeValues.SS--

        log(timeValues)

        if (!over()) return
        stopInterval(i)
    }, 1000)

    return i
}

/**FOR TESTING ONLY */
const log = (times) => {
    console.clear()
    console.log(times.DD + " D\t" + times.HH + " H\t" + times.MM + " M\t" + times.SS + " S")
}

/*ENTRY POINT*/

const moment = require("moment")

//get initial values needed for each time period of the countdown
const openEnrollmentStartDate = moment([2021, 9, 15])
const now = moment(moment.now())
const { _data } = moment.duration(openEnrollmentStartDate.diff(now))
const { seconds: SS, minutes: MM, hours: HH, days: DD } = _data
// console.log(`${DD} : ${HH} : ${MM} : ${SS}`)

//set initial values
const timeValues = {
    DD,
    HH,
    MM,
    SS,
}

//start countdown here
startInterval()
