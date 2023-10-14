const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const SendEmailUtility = require('../utility/SendEmailUtility');
const OTPModel = require('../models/OTPMode');





exports.registration = async (req, res) => {
    try {
        let reqBody = req.body;
        let password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        reqBody.password = hashPassword;
        let rs = await userModel.create(reqBody);
        res.json({ success: true, data: rs });
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.toString() });
    }
}


exports.login = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let rs = await userModel.findOne({ email });
        if (rs) {
            const result = await bcrypt.compare(password, rs.password);
            if (result) {
                // create token
                const token = jwt.sign({ userId: rs._id }, "Secret125A");
                res.json({ success: true, token: token, data: rs });
            }
            else {
                res.json({ success: false, message: "Invalid password" });
            }
        } else {
            res.json({ success: false, message: "Invalid email" });
        }
    } catch (e) {
        res.status(500).json({ success: false, message: e.toString() });
    }
}


exports.profileDetails = async (req, res) => {
    try {
        let userId = req.headers['userId'];
        let rs = await userModel.findOne({ _id: userId });
        res.json({ status: "success", data: rs })
    } catch (e) {
        res.status(500).json({ success: false, message: e.toString() });
    }
};



exports.profileUpdate = async (req, res) => {
    try {
        let id = req.headers['userId'];
        let reqBody = req.body;
        let rs = await userModel.updateOne({ _id: id }, reqBody);
        res.json({ status: "success", data: rs })
    }
    catch (e) {
        res.json({ status: "fail", data: e.toString() })
    }
};


exports.RecoverVerfiyEmail = async (req, res) => {
    try {
        let email = req.params.email;
        let OTPCode = Math.floor(10000 + Math.random() * 90000);
        let EmailText = `Your verfication code is ${OTPCode}`;
        let EmailSubject = `Verification Code`;

        let rs = await userModel.find({ email: email }).count();

        if (rs === 1) {
            await OTPModel.create({ email: email, otp: OTPCode })
            await SendEmailUtility({ email, EmailText, EmailSubject });
            res.json({ status: "success", data: "5 digit verfication code has been sent" })
        } else {
            res.json({ status: "fail", data: "Email not found" })
        }
    }

    catch (e) {
        res.json({ status: "fail", data: e.toString() })
    }
};

