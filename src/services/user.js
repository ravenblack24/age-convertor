const UserAge = require('../model/user');

const createNew = async (name, dateOfBirth) => {
    try {
        let query = { 
            name,
            dateOfBirth
        };
        const newUser = UserAge(query);
        const saved = await newUser.save();
        console.log("Saved");
        return saved;
    } catch (err) {
        throw new Error("Error saving new entry");
    }
}

const fetchUsers = async () => {
    try {
       var data = await UserAge.find({});
       console.log("data retrieved");
       return data;
    } catch (err) {
        throw new Error("Error retrieving user records");
    }
}

// const calculateAge = (userRecord) => {
//     let element = {};
//     let date = userRecord.dateOfBirth;
//     element.name = userRecord.name;
//     element.years = now.diff(date, 'years'),
//     element.days = now.diff(date, 'days'),
//     element.hours = now.diff(date, 'hours')
//     return element;
// }

module.exports = {createNew, fetchUsers}