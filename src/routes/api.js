const express = require("express");
const jwtAuthectication = require('../middlewares/jwtAuth')

const router = express.Router();

const { registration, login, profileDetails, profileUpdate, RecoverVerfiyEmail } = require('../controller/userController');
const {createTask, deleteTask, updateTask, listTaskByStatus} = require("../controller/taskController")

router.post("/registration", registration);
router.get("/login", login);
router.get('/profileDetails', jwtAuthectication, profileDetails);
router.post('/profileUpdate', jwtAuthectication, profileUpdate);
router.get('/RecoverVerfiyEmail/:email', RecoverVerfiyEmail)

// manage the task

router.post("/createTask", jwtAuthectication, createTask);
router.get("/deleteTask/:id",jwtAuthectication, deleteTask);
router.post("/updateTask/:id/:status", jwtAuthectication, updateTask);
router.get("/listTaskByStatus/:status", jwtAuthectication, listTaskByStatus)





module.exports = router;
