const express = require("express");
const router = express.Router();
const studentCont = require('../controller/studentController');

router.post('/reg-student', studentCont.createStudentRegistration);
router.get('/delete-student/:id', studentCont.deleteStudent);
router.post('/update-student/:id', studentCont.updateStudent);
router.get('/all-student',studentCont.allRegistedStudent )
router.get('/get-by-id/:id', studentCont.getById)





module.exports = router;
