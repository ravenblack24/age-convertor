const UserAge = require('../model/user');

/**
 * Add record to database
 * 
 * @param {String} name the user name
 * @param {Moment} dateOfBirth the user date of birth
 * 
 * @return {Promise<Object>}
 * @throws {Error} 
 */
const createNew = async (name, dateOfBirth) => {
    try {
        const newUser = UserAge({name, dateOfBirth});
        const saved = await newUser.save();
        return saved;
    } catch (err) {
        throw new Error("Error saving new entry");
    }
}

/**
 * Retrieve all records from database
 * 
 * @return {Promise<Object>}
 * @throws {Error} 
 */
const fetchUsers = async () => {
    try {
       const data = await UserAge.find({});
       return data;
    } catch (err) {
        throw new Error("Error retrieving user records");
    }
}

module.exports = {createNew, fetchUsers}