// const daysEl = document.getElementById("days")
// const hoursEl = document.getElementById("hours")
// const minutesEl = document.getElementById("minutes")
// const secondsEl = document.getElementById("seconds")
// console.log(daysEl, hoursEl, minutesEl, secondsEl)

const DD = "days"
const HH = "hours"
const MM = "minutes"
const SS = "seconds"

const next = {
    SS: "MM",
    MM: "HH",
    HH: "DD",
}
const prev = {
    DD: "HH",
    HH: "MM",
    MM: "SS",
}
const resets = {
    SS: 60, //secs in mins--\
    MM: 59, //mins in hrs----> -1
    HH: 24, //hrs in days --/
    //no reset for days because no months in countdown
}
const timeValues = {
    DD: 0,
    HH: 1,
    MM: 1,
    SS: 0,
}

//functions

// const render = (time, count) => (document.getElementById(time).innerHTML = count)

const reduce = (time) => {
    if (timeValues[time]) {
        timeValues[time]--

        //recursively reset all times lower
        return reset(prev[time])
    }

    reduce(next[time])
}

const stopInterval = (i) => {
    console.log("done!")
    clearInterval(i)
}

const over = () => {
    // console.log(timeValues)
    return !timeValues.DD && !timeValues.HH && !timeValues.MM && !timeValues.SS
}

const reset = (time) => {
    timeValues[`${time}`] = resets[time]
    if (time !== "SS") reset(prev[time])
}

const startInterval = () => {
    log(timeValues)

    const i = setInterval(() => {
        if (!timeValues.SS) {
            //seconds ran out, reduce minute and work
            //up from there if they also ran out
            reduce(next["SS"])
        }

        timeValues.SS--

        log(timeValues)

        if (!over()) return
        stopInterval(i)
    }, 1000)

    return i
}

const log = (times) => {
    console.clear()
    console.log(times.DD + " D\t" + times.HH + " H\t" + times.MM + " M\t" + times.SS + " S")
}

/*ENTRY POINT*/
// const timeInterval = startInterval()

console.log(moment().format())
