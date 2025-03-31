const express = require('express');
const router = express.Router();

const { login, signup, resetPasswordToken, resetPassword, updateProfilePic } = require('../controllers/Auth');
const { auth } = require('../middlewares/middlewareAuth');


router.post("/login",login);
router.post("/signup",signup);

router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password",resetPassword);
router.post("/update-profile-pic",auth,updateProfilePic);

module.exports = router;