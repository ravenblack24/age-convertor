const {createNew, fetchUsers} = require('../services/user');
const {calculateAge} = require('../helpers/calculation');
const moment = require('moment');

/**
 * Add new record
 * 
 * @param {Request} req  the request object
 * @param {Response} res the response to the request
 * 
 * @return {String}
 */
const addNew = async (req, res) => {
    const name = req.body.name;
    const dateOfBirth = req.body.date;

    try {
        const record = await createNew(name, dateOfBirth);
        res.status(200).send(record);    
    } catch (err) {
        return res.send({error: "Unable to save"});
    }
}

/**
 * Retrieve all records
 * 
 * @param {*} req the request object
 * @param {*} res the response to the request
 * 
 * @return {String}
 */
const getAll = async (req, res) => {

    try {
        const data = await fetchUsers();
        const response = [];

        data.forEach(entry => {
            let element = {};
            const ageCalc = calculateAge(entry.dateOfBirth)

            element.id = entry._id;
            element.name = entry.name;
            element.years = ageCalc.years;
            element.days = ageCalc.days;
            element.hours = ageCalc.hours;

            response.push(element);
        });

        return res.json(response);

    } catch (err) {
        return res.send({error: "Unable to get records"});
    }
}

module.exports = {addNew, getAll}