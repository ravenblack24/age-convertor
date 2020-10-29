require('dotenv').config({path:'.env'});
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    dateOfBirth: {type:Date, required: true}
})

module.exports = mongoose.model('User', userSchema);