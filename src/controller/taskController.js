const taskModel = require("../models/taskModel");

exports.createTask = async (req, res) => {
    try {
        let reqBody = req.body;
        reqBody.id = req.headers["id"];
        let rs = await taskModel.create(reqBody);
        res.json({ status: "success", data: rs });
    } catch (e) {
        res.json({ status: "fail", data: e.toString() });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        let id = req.params.id;
        let query = { _id: id };
        let rs = await taskModel.deleteOne(query);
        res.json({ status: "Delete Success", data: rs })
    } catch (e) { rs.json({ status: "Data not found", data: e.toString() }) }
};


exports.updateTask = async (req, res) => {
    try {
        let id = req.params.id;
        let status = req.params.status;
        let query = { _id: id };
        let reqBodyStatus = { status: status };
        let reqBody = req.body;

        let rs = await taskModel.updateOne(query, reqBody, reqBodyStatus);
        res.json({ status: "success", data: rs });
    } catch (e) {
        res.json({ status: "fail", data: e.toString() });
    }
};


exports.listTaskByStatus = async (req, res) => {
    try {
        let status = req.params.status;
        let id = req.headers["_id"];
        let rs = await taskModel.find({ id: id, status: status }).count();
        res.json({ status: "success", data: rs });
    } catch (e) { res.json({ status: " fail ", data: e.toString() }) }
    ;
}

exports.taskStatusCount = async (req,res)=>{
    try {
        let id=req.headers['id'];
        let result= await TasksModel.aggregate([
            {$match:{_id:email}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ])
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}