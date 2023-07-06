const express = require("express");
const {
    sendSms,
}=require("../controller/sendCtrl")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
router.post("/",authMiddleware,isAdmin,sendSms)

module.exports = router;
