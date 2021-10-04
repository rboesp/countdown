let lastRun = false

function startTimer({ domElement, start, reset, tick, cb }) {
    let timeLeft = start
    domElement.innerHTML = timeLeft
    console.log(domElement.id + " " + timeLeft)
    const i = setInterval(() => {
        if (timeLeft) --timeLeft
        domElement.innerHTML = timeLeft
        if (timeLeft <= 0) {
            cb(i, lastRun)
            timeLeft = reset
        }
    }, tick || 1000)

    return i
}

$(document).ready(() => {
    const days = document.getElementById("days")
    // const hours = document.getElementById("hours")
    // const minutes = document.getElementById("minutes")
    const seconds = document.getElementById("seconds")
    // console.log(days, hours, minutes, seconds)

    // const dayStart = 60 //seconds in minute
    // const hourStart =
    // const minuteStart =
    // const secondStart =

    const timeOptions = [
        {
            domElement: days, //minutes for now instead
            start: 1,
            reset: 2,
            tick: 2 * 1000,
            cb: (i) => {
                console.log("done!")

                //TODO: here tell the other intervals it's the last run
                lastRun = true

                clearInterval(i) //clear because this one doesn't ever reset
            },
        },
        // {
        //     domElement: hours,
        //     start: 59,
        //     reset: 59,
        //     cb: null,
        // },
        // {
        //     domElement: minutes,
        //     start: 59,
        //     reset: 59,
        //     cb: null,
        // },
        {
            domElement: seconds,
            start: 2,
            reset: 2,
            cb: (i, lastRun) => {
                //if not last run let run
                if (!lastRun) return //this will not work as expected with arrow here!

                //if here countdown done!
                clearInterval(i)

                //here can set anything that needs to wait
                //until countdown fully over
            },
        },
    ]

    const intervalIds = timeOptions.map((option) => startTimer(option))

    function clearIntervals() {
        intervalIds.forEach((i) => {
            clearInterval(i)
        })
    }
    // console.log(intervalIds)

    // setTimeout(() => {
    //     intervalIds.forEach((i) => {
    //         clearInterval(i)
    //     })
    // }, 11000)
})
