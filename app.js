const express = require('express');
const app = new express();
const router = require('./src/routes/api')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors');
const hpp = require('hpp');
require('dotenv').config();
const mongoose = require('mongoose');


app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

// Middleware to parse JSON data with a size limit of 50mb
app.use(express.json({ limit: '50mb' }));

// Middleware to parse URL-encoded data with a size limit of 50mb
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// rate limite here

const limiter = rateLimit({ windowMs: 15 * 60 * 60, max: 4000 })
app.use(limiter)



// connect to database
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {console.log("DB Connected")})
//     .catch((err) => console.log(err));

// const routeFiles = readdirSync('./src/routes');
// readdirSync("./src/routes").map(r => app.use("/api/v1", require(`./src/routes/${r}`)))

let URI = "mongodb+srv://baitulamin1900:baitulamin1900@cluster0.v4gxpkr.mongodb.net/STUDENT"
let OPTION = {user : "baitulamin1900", pass : 'baitulamin1900', autoIndex : true};

mongoose.connect(URI,OPTION)
    .then((res)=> {
        console.log("DB Connected")
    })
    .catch((err)=> {
        console.log(err)
    })


app.use("/api/v1",router);
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
});


module.exports = app;






