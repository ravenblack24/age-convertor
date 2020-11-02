const moment = require('moment');

const calculateAge = (dateOfBirth) => {
    //const date = new Date(dateOfBirth);
    const date = moment(dateOfBirth);
    const now = moment();
    const birthYear = date.format('YYYY');
    const currentYear = now.format('YYYY');
    const yr = (now.diff(date, 'years').toLocaleString());

    let years;
    
    if(date.month() >= now.month() && date.date() > now.date()) {
       years = (currentYear-1) - birthYear;
    } else {
        years = currentYear - birthYear;
    }

    let timeInHours = (now.diff(date, 'hours'));

    let leapYears = countLeapYears(birthYear, currentYear);
  
    timeInHours -= (8784 * leapYears);
    years -= leapYears;
    
    if(years > 0) {
        timeInHours = timeInHours % (parseInt(8760 * years));
    }

    // get days
    let days = parseInt(timeInHours / 24);
    // get hours
    let hours = timeInHours % 24;
    console.log(dateOfBirth.toDateString(), yr, days, hours);

    return {days, hours};
}

const countLeapYears = (birthYear, currentYear) => {
    let count=0;

    for(let i = birthYear; i < currentYear; i++) {
        if(moment([i]).isLeapYear()) {
            count++;
        }
    }
    return count;
}

module.exports = {calculateAge}