const mongoose = require('mongoose');
const { Schema } = mongoose;

const userData = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone : {
        type: Number,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
}, {versionKey : false, timestamps: true});


const userSchema = mongoose.model('user', userData);

module.exports = userSchema;
