const express = require("express");
const { auth } = require("../middlewares/middlewareAuth");
const { getMessages, sendMessage, getAllUsers, getUserDetails } = require("../controllers/messages");
const router = express.Router();

router.post("/allusers",auth,getAllUsers);
router.post("/getmessages",auth,getMessages);
router.post("/send/:id",auth,sendMessage);
router.post("/getuserdetails",auth,getUserDetails);

module.exports = router;