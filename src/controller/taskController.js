const taskModel = require("../models/taskModel");

exports.createTask = async (req,res) => {
    try {
        let reqBody = req.body;
        reqBody.id = req.headers["id"];
        let rs = await taskModel.create(reqBody);
        res.json({ status: "success", data: rs });
    } catch (e) {
        res.json({ status: "fail", data: e.toString() });
    }
};






