const {createNew, fetchUsers, calculateAge} = require('../services/user');
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
            element.years = now.diff(date, 'years'),
            element.days = now.diff(date, 'days'),
            element.hours = now.diff(date, 'hours')

            // let element = calculateAge(entry);
            response.push(element);
        });

        return res.json(response);

    } catch (err) {
        return res.send({error: "Unable to get records"});
    }
}

module.exports = {addNew, getAll}