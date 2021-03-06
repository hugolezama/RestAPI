const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: Number
});

module.exports = mongoose.model('Users', UserSchema)