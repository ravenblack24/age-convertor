const {createNew, fetchUsers} = require('../services/user');
const moment = require('moment');

const addNew = async (req, res) => {
    const name = req.body.name;
    const dateOfBirth = req.body.date;

    try {
        await createNew(name, dateOfBirth);
        console.log("saved");
        res.sendStatus(200);    
    } catch (err) {
        return res.send({error: "Unable to save"});
    }
}

const getAll = async (req, res) => {

    try {
        const data = await fetchUsers();
        const response = [];
        const now = new moment();

        let element = {};

        data.forEach(entry => {
            let date = entry.dateOfBirth;
            element.id = entry._id;
            element.name = entry.name;
            element.years = now.diff(date, 'years'),
            element.days = now.diff(date, 'days'),
            element.hours = now.diff(date, 'hours')

            response.push(element);
            element = {};
        });

        return res.json(response);

    } catch (err) {
        return res.send({error: "Unable to get records"});
    }
}

module.exports = {addNew, getAll}