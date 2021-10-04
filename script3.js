/* last run set by event i.e. bigger brethren timer being completed */

const daysEl = document.getElementById("days")
const hoursEl = document.getElementById("hours")
const minutesEl = document.getElementById("minutes")
const secondsEl = document.getElementById("seconds")
console.log(daysEl, hoursEl, minutesEl, secondsEl)

//function to start a time interval, called recursively
const startInterval = (currentTimeOptions, checkResetCb) => {
    const { name, tick, startTime, resetTime, firstRun } = currentTimeOptions
    const el = document.getElementById(name)
    let count = firstRun ? startTime : resetTime
    currentTimeOptions.firstRun = false
    el.innerHTML = count

    const i = setInterval(() => {
        count--

        el.innerHTML = count

        //are we done?
        if (count) return

        //if here done with interval
        clearInterval(i)
        checkResetCb(currentTimeOptions)
    }, tick)

    return i
}

//times up function
const intervalComplete = (currentTimeOptions) => {
    const { name, resetTick, stopReset, resetTime, doneCb } = currentTimeOptions
    console.log(currentTimeOptions)
    currentTimeOptions.tick = resetTick
    if (!stopReset) {
        startInterval(currentTimeOptions, intervalComplete) //reset interval your in
    }

    if (name === "minutes") {
        //last run
        timeOptions[0].stopReset = true
        timeOptions[1].stopReset = true
    }

    //if here done resetting interval in current time period
    //check if done with entire countdown completely
    // if (name !== "seconds") return //not totally done yet
    // console.log("completed with countdown")
    // document.getElementById("parent").innerHTML = "Done!"
}

//returns milliseconds in time period
const seconds = (x = 1) => x * 1000
const minutes = (x = 1) => x * seconds(60)
const hours = (x = 1) => x * minutes(60)
const days = (x = 1) => x * hours(24)

//call the function to start it off

//TODO: just added these, run and watch minutes show up
const timeOptions = [
    {
        name: "minutes",
        startTime: 2,
        resetTime: 0, //how many in an hour
        stopReset: false, //do I stop the reset?
        firstRun: true, //do I use the startTime?
        tick: seconds(2), //
        resetTick: seconds(4),
        //prob add a next min -> sec etc.
    },
    {
        name: "seconds",
        startTime: 2, //12
        resetTime: 4, //59
        stopReset: false, //do I stop the reset?
        firstRun: true, //do I use the startTime?
        tick: seconds(1), //
        resetTick: seconds(1),
        //prob add a next min -> sec etc.
    },
    // {
    //     tick: hours,
    //     start: 59,
    //     reset: 59,
    //     cb: null,
    // },
    // {
    //     tick: minutes,
    //     start: 59,
    //     reset: 59,
    //     cb: null,
    // },
]

const intervalIds = timeOptions.map((option) => startInterval(option, intervalComplete))

function clearIntervals() {
    intervalIds.forEach((i) => {
        clearInterval(i)
    })
}

// startInterval(sec_options, intervalComplete)
