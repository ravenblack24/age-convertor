var User = require('../model/user');

const createNew = async (data) => {
    try {
       const newUser = User(data);
       const saved = await newUser.save();
       console.log("Saved"); 
    } catch (err) {
        throw new Error("Error saving new entry");
    }
}

module.exports = {createNew}