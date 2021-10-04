const days = document.getElementById("days")
const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")
console.log(days, hours, minutes, seconds)

const resets = {}
const next = {}
const down = {}

// const days = 0;
// const hours = 0;
const minutes = 1
const seconds = 12

const write = (time, count) => (document.getElementById(time).innerHTML = count)

const reduce = (time) => {}

const reset = (time) => {}

const startInterval = () => {
    const i = setInterval(() => {}, 1000)

    return i
}
