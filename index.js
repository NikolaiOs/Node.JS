// console.log('Record 1');
//
// setTimeout(() => {
//     console.log('Record 2');
//
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             сonsole.log('Record 3');
//             Promise.resolve().then(() => {
//                 console.log('Record 4');
//             });
//         });
//     });
// });
//
// console.log('Record 5');
//
// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));

// 1 5 6 2 3 4

const EventEmitter = require('events');

let timerShow = {};

function  diffSubtract(date1, date2) {
    return date2 - date1;
};

let endDate = {
    "full_year": "2029",
    "month": "03",
    "day": "28",
    "hours": "00",
    "minutes": "00",
    "seconds": "00"
};

let endDateStr = `${endDate.full_year}-${endDate.month}-${endDate.day}T${endDate.hours}:${endDate.minutes}:${endDate.seconds}`;

timer = setInterval(function () {

    let now = new Date();

    let date = new Date(endDateStr);

    let ms_left = diffSubtract(now, date);

    if (ms_left <= 0) {

        emitter.emit('timerEnd');

    } else {

        let res = new Date(ms_left);

        let str_timer = `${res.getUTCFullYear() - 1970}.${res.getUTCMonth()}.${res.getUTCDate() - 1} ${res.getUTCHours()}:${res.getUTCMinutes()}:${res.getUTCSeconds()}`;

        timerShow = str_timer;
        console.clear();
        console.log(timerShow);
    }
}, 1000);

const emitter = new EventEmitter();

emitter.on('timerEnd', () => {
    clearInterval(timer);
    console.log("Время закончилось");
});