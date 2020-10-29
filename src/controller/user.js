const {createNew, fetchData} = require('../services/user');
var moment = require('moment');

const addNew = async (req, res) => {
    const name = req.body.name;
    const dateOfBirth = req.body.dob;

    try {
        await createNew(name, dateOfBirth);
        console.log("saved");
    
    } catch (err) {
        return res.send({error: "Unable to save"});
    }
}

const getAll = async (req, res) => {

    try {
        const data = await fetchData();
        const response = [];
        const now = new moment();

        let element = {};

        data.forEach(entry => {
            let date = entry.dateOfBirth;

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