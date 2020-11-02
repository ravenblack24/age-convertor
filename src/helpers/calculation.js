const moment = require('moment');

/**
 * Calculates age in years, days and hours
 * 
 * @param {String} dateOfBirth the date of birth in YYYY-MM-DD format
 * 
 * @return {Object}
 */
const calculateAge = (dateOfBirth) => {
    const LEAP_YEAR_IN_HOURS = 8784;
    const YEAR_IN_HOURS = 8760;

    const date = moment(dateOfBirth);
    const now = moment();
    const years = now.diff(date, 'years');

    let timeInHours = now.diff(date, 'hours');
    let yearCounter = years; // to not mutate years
    let leapYearCount = countLeapYears(date.format('YYYY'), now.format('YYYY'));
  
    timeInHours -= (LEAP_YEAR_IN_HOURS * leapYearCount);
    yearCounter -= leapYearCount;
    
    if(yearCounter > 0) {
        timeInHours = timeInHours % (parseInt(YEAR_IN_HOURS * yearCounter));
    }

    return {
        years: years.toLocaleString(), 
        days: parseInt(timeInHours / 24), 
        hours: timeInHours % 24
    };
}

/**
 * Calculates the number of leap years since year of birth
 * 
 * @param {String} birthYear  the year of birth
 * @param {String} currentYear  the current year
 * 
 * @return {Number}
 */
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