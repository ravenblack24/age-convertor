const moment = require('moment');

const calculateAge = (dateOfBirth) => {
    const date = new Date(dateOfBirth);
    const now = moment();

    const currentYear = moment().format('YYYY')
    const birthYear = date.getFullYear();

    let years;
    
    if(date.getMonth() >= now.month() && date.getDate() > now.date()) {
       years = (currentYear-1) - birthYear;
    } else {
        years = currentYear - birthYear;
    }

    let timeInHours = (now.diff(dateOfBirth, 'hours'));

    let leapYears = getLeapYears(birthYear, currentYear);
    console.log("leap years: "+leapYears);
    timeInHours -= (8784 * leapYears);

    years -= leapYears;
    
    if(years >= 1) {
        timeInHours = timeInHours % (parseInt(8760 * years));
    }
    
    // get days
    let days = parseInt(timeInHours / 24);
    timeInHours = timeInHours % 24;

    console.log("days: " + days);
    console.log("hours: " + timeInHours);

    return birthYear;
}

const getLeapYears = (birthYear, currentYear) => {
    let count=0;

    for(let i = birthYear; i < currentYear; i++) {
        if(moment([i]).isLeapYear()) {
            count++;
        }
    }
    return count;
}

module.exports = {calculateAge}