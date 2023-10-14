const express = require("express");
const jwtAuthectication = require('../middlewares/jwtAuth')

const router = express.Router();

const { registration, login, profileDetails, profileUpdate, RecoverVerfiyEmail } = require('../controller/userController');

router.post("/registration", registration);
router.get("/login", login);
router.get('/profileDetails', jwtAuthectication, profileDetails);
router.post('/profileUpdate', jwtAuthectication, profileUpdate);
router.get('/RecoverVerfiyEmail/:email', RecoverVerfiyEmail)





module.exports = router;
