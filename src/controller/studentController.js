const studentsModel = require('../models/studentsModel');


// create 
exports.createStudentRegistration = async (req, res) => {
    let reqBody = req.body;
    try {
        let result = await studentsModel.create(reqBody);
        res.status(200).json({ status: "success", data:result })
    }
    catch (e) {
        res.status(200).json({status : "fail", data:e})
    }
}


exports.deleteStudent = async (req, res)=> {
    let id = req.params.id;
    let query = {_id: id};

    try {
        let result = await studentsModel.deleteOne(query);
        res.status(200).json({status: "success", data:result})
    }
    catch (e) {
        res.status(200).json({status: "fail", data:e})
    }
};

    exports.updateStudent = async (req, res)=> {
        let id = req.params.id;
        let query = {_id: id};
        let reqBody = req.body;
        try {
            let result = await studentsModel.updateOne(query, reqBody);
            res.status(200).json({status: "success", data:result})
        }
        catch (e) {
            res.status(200).json({status: "fail", data:e})
        }
    }


exports.allRegistedStudent = async (req, res)=> {
    try {
        let result = await studentsModel.find();
        res.status(200).json({status: "success", data:result})
    }
    catch (e) {
        res.status(200).json({status: "fail", data:e})
    }
}
exports.getById = async (req, res)=> {
    let id = req.params.id;
    let query = {_id: id};

    try {
        let result = await studentsModel.findOne(query);
        res.status(200).json({status: "success", data:result})
    }
    catch (e) {
        res.status(200).json({status: "fail", data:e})  
    }
}