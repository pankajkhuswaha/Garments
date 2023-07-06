const express = require("express");
const {
  createEmail,
  updateEmail,
  deleteEmail,
  getEmailById ,
  getAllEmails,
Bulk_EMAILS
} = require("../controller/emailCrtls");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { bulkSave } = require("../models/productModel");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createEmail);
router.put("/:_id", authMiddleware, isAdmin, updateEmail);
router.delete("/:id", authMiddleware, isAdmin, deleteEmail);
router.get("/:id",  getEmailById );
router.get("/",authMiddleware,isAdmin, getAllEmails);
router.post('/bulk',authMiddleware,isAdmin,Bulk_EMAILS);

module.exports = router;