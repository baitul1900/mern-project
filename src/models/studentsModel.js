const mongoose = require("mongoose");

const {Schema} = mongoose;

const studentsData = new Schema({
    email : {type: String, unique : true},
    firstName : {type : String, trim : true},
    lastName : {type : String, trim : true},
    mobile : {type : String},
    password : {type : String},
    address : {type : String},
    roll : {type : Number},
    class : {type : String},
}, {timestamps : true, versionKey : false});

const studentsModel = mongoose.model("students", studentsData);

module.exports = studentsModel;
