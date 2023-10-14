const mongoose = require("mongoose");

const {Schema} = mongoose;

const taskData = new Schema({
    title : {type : String},
    description : {type : String},
    status : { type : String},
    id : {type : Number}
}, {timestamps : true, versionKey : false});

const taskModel = mongoose.model("tasks", taskData);

module.exports = taskModel;