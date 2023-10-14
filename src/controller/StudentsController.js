const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const studentsModel = require('../models/studentsModel')
const bcrypt = require('bcrypt');
const SendEmailUtility = require('../utility/SendEmailUtility');
const OTPModel = require('../models/OTPMode');




exports.studentsRegister = async (req, res) => {
    try {
        let reqBody = req.body;
        let password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        reqBody.password = hashedPassword;
        let result = await studentsModel.create(reqBody);
        res.json({ status: "registration successfully", data: result })
    } catch (e) { res.json({ status: "registration fail", data: e.toString() }) }
};


exports.login = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let result = await studentsModel.findOne({ email });

        if (result) {

            const rs = await bcrypt.compare(password, result.password);

            if (rs) {
                // for assingment I don't implement expireIn
                const token = jwt.sign({ email: email }, "Src125469888");
                res.json({ success: true, token: token, data: result });

            } else { res.json({ success: false, message: "Invalid password" }) }

        } else { res.json({ success: false, message: "Invalid email" }); }
    } catch (e) {
        res.json({ status: "fail", data: e.toString() })
    }
};


exports.studentsDetails = async (req, res) => {
    try {
        let email = req.headers["email"];
        let result = await studentsModel.findOne({ email: email });
        res.json({ status: "success", data: result });
    } catch (e) {
        res.json({ status: "fail", data: e.toString() })
    }
}; 


exports.updateStudents = async (req,res) => {
    try {
        let email = req.headers["email"];
        let reqBody = req.body;
        let result = await studentsModel.findOneAndUpdate({ email: email }, reqBody, { new: true });
        res.json({ status: "success", data: result });
    } catch (e) {
        res.json({ status: "fail", data: e.toString() })
    }
};


exports.deleteStudents = async (req, res) => {
    try {
        let id = req.params.id;
        let query = {_id : id};
        let result = await studentsModel.deleteOne(query); 
    } catch(e) {
        res.json({ status: "fail", data: e.toString() })
    }
};