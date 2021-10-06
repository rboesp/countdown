// const daysEl = document.getElementById("DD")
// const hoursEl = document.getElementById("HH")
const minutesEl = document.getElementById("MM")
const secondsEl = document.getElementById("SS")
const timeElements = [/*daysEl, hoursEl,*/ minutesEl, secondsEl]
console.log(timeElements)

// function change() {
//     const left = document.getElementById("poop")
//     console.log(left)
//     left.style.animation = "circleProgressLoad_left 600s linear infinite forwards;"
// }
// window.setTimeout(change, 5)

let root = document.documentElement

root.style.setProperty("--li-transform-animation-duration", "600s")

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

const render = () => {
    timeElements.forEach(({ id }) => {
        const count = timeValues[id]
        document.getElementById(id).innerHTML = count
    })
}

const reduce = (timeLabel) => {
    if (timeValues[timeLabel]) {
        timeValues[timeLabel]--

        //recursively reset all times lower
        return reset(timeLabelOrderDown[timeLabel])
    }

    reduce(timeLabelOrderUp[timeLabel])
}

const stopInterval = (i) => {
    clearInterval(i)
    console.log("countdown done!")
    document.getElementById("parent").style.display = "none"
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
    // log(timeValues)
    render()

    const i = setInterval(() => {
        if (!timeValues.SS) {
            //seconds ran out, reduce minute and work
            //up from there if they also ran out
            reduce(timeLabelOrderUp["SS"])
        }

        timeValues.SS--

        render()
        // log(timeValues)

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

// const moment = require("moment")

//get initial values needed for each time period of the countdown
// const openEnrollmentStartDate = moment([2021, 9, 15])
// const now = moment(moment.now())
// const { _data } = moment.duration(openEnrollmentStartDate.diff(now))
// const { seconds: SS, minutes: MM, hours: HH, days: DD } = _data
// console.log(`${DD} : ${HH} : ${MM} : ${SS}`)

//set initial values
const timeValues = {
    // DD,
    // HH,
    MM: 10,
    SS: 0,
}

//start countdown here
startInterval()
