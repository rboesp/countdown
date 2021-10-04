const lastRuns = {
    seconds: false,
}

function startTimer({ domElement, start, reset, tick = 1000, cb }) {
    let timeLeft = start
    domElement.innerHTML = timeLeft
    console.log(domElement.id + " " + timeLeft)
    const i = setInterval(() => {
        if (timeLeft) --timeLeft
        domElement.innerHTML = timeLeft 
            timeLeft = reset
            domElement.innerHTML = reset
            const lastRun = lastRuns?.[`${domElement.id}`]
            cb(i, lastRun)
        }
    }, tick)

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
            start: 2,
            reset: 0,
            tick: 4 * 1000,
            cb: (i) => {
                console.log("done!")

                //TODO: tell the lower brethren it's last run
                lastRuns["seconds"] = true

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
            start: 4,
            reset: 59,
            tick: 1 * 1000,
            cb: (i, lastRun) => {
                //if not last run let run
                if (!lastRun) return //this will not work as expected with arrow here!

                //if here countdown done!
                clearInterval(i)

                //here can set anything that needs to wait
                //until countdown fully over
                clearIntervals()
            },
        },
    ]

    const intervalIds = timeOptions.map((option) => {
        startTimer(option)
    })

    function clearIntervals() {
        intervalIds.forEach((i) => {
            clearInterval(i)
        })
    }
})
