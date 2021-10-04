// const daysEl = document.getElementById("days")
// const hoursEl = document.getElementById("hours")
// const minutesEl = document.getElementById("minutes")
// const secondsEl = document.getElementById("seconds")
// console.log(daysEl, hoursEl, minutesEl, secondsEl)

const DD = "days"
const HH = "hours"
const MM = "minutes"
const SS = "seconds"

const resets = {
    SS: 59, //secs in mins
    MM: 59, //mins in hrs
    HH: 24, //hrs in days
    //no reset for days because no months
}
const next = {
    SS: MM, //
    MM: HH, //
    HH: DD, //
}
const prev = {
    DD: HH, //
    HH: MM, //
    MM: SS, //
}
console.log(resets, next, prev)

/*STARTING VALUES */
// const days = 0;
// const hours = 0;
// const render = (time, count) => (document.getElementById(time).innerHTML = count)

//for now
let minutes = 1
let seconds = 2

const reduce = (time) => {
    if (time) {
        time--
        reset(prev[time])
    }

    //check over here
    //return

    reduce(time)
}

const reset = (time) => {}

const startInterval = () => {
    log(minutes + "\t" + seconds)
    const i = setInterval(() => {
        seconds--
        log(minutes + "\t" + seconds)
        if (seconds) return

        //seconds ran out, reduce minute and work
        //up from there if they also ran out
        reduce(next[SS])

        // clearInterval(i) //keep it going for now
    }, 1000)

    return i
}

const log = (msg) => {
    console.clear()
    console.log(msg)
}

/*ENTRY POINT*/
const timeInterval = startInterval()
