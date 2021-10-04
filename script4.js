const days = document.getElementById("days")
const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")
console.log(days, hours, minutes, seconds)

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

/*STARTING VALUES */
// const days = 0;
// const hours = 0;
const minutes = 1
const seconds = 12

const render = (time, count) => (document.getElementById(time).innerHTML = count)

const reduce = (time) => {}

const reset = (time) => {}

const startInterval = () => {
    const i = setInterval(() => {}, 1000)

    return i
}
