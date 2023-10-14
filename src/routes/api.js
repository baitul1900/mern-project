const express = require("express");
const jwtAuthectication = require('../middlewares/jwtAuth')

const router = express.Router();

const { studentsRegister, login, studentsDetails, updateStudents, deleteStudents } = require('../controller/StudentsController');
const { } = require("../controller/WorksController")

router.post("/studentsRegister", studentsRegister);
router.get("/login", login);
router.get('/studentsDetails', jwtAuthectication, studentsDetails);
router.post('/updateStudents', jwtAuthectication, updateStudents);
router.get('/deleteStudents/:id', jwtAuthectication, deleteStudents )
// router.get('/RecoverVerfiyEmail/:email', RecoverVerfiyEmail)

// // manage the task

// router.post("/createTask", jwtAuthectication, createTask);
// router.get("/deleteTask/:id",jwtAuthectication, deleteTask);
// router.post("/updateTask/:id/:status", jwtAuthectication, updateTask);
// router.get("/listTaskByStatus/:status", jwtAuthectication, listTaskByStatus)





module.exports = router;
