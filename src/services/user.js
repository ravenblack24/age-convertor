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
    } catch (err) {
        throw new Error("Error saving new entry");
    }
}

const fetchData = async () => {
    try {
       var data = await UserAge.find({});
       console.log("data retrieved");
       return data;
    } catch (err) {
        throw new Error("Error retrieving user records");
    }
}

module.exports = {createNew, fetchData}