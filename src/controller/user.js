const {createNew, fetchUsers} = require('../services/user');
const {calculateAge} = require('../helpers/calculation');
const moment = require('moment');

const addNew = async (req, res) => {
    const name = req.body.name;
    const dateOfBirth = req.body.date;

    try {
        const record = await createNew(name, dateOfBirth);
        console.log("saved");
        res.status(200).send(record);    
    } catch (err) {
        return res.send({error: "Unable to save"});
    }
}

const getAll = async (req, res) => {

    try {
        const data = await fetchUsers();
        const response = [];
        const now = new moment();

        data.forEach(entry => {
            let element = {};
            let date = entry.dateOfBirth;
            element.id = entry._id;
            element.name = entry.name;
            element.years = (now.diff(date, 'years').toLocaleString());
            let leapYears = calculateAge(date);
            console.log(leapYears);
            // element.days = (now.diff(date, 'days').toLocaleString()),
            // element.hours = (now.diff(date, 'hours').toLocaleString())
           // response.push(element);
        });

        // return res.json(response);

    } catch (err) {
        return res.send({error: "Unable to get records"});
    }
}

module.exports = {addNew, getAll}