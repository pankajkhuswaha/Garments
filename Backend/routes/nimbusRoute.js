const express = require("express");
const {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateById ,
  getAllTemplates,
} = require("../controller/templateCrt");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createTemplate);
router.put("/:_id", authMiddleware, isAdmin, updateTemplate);
router.delete("/:id", authMiddleware, isAdmin, deleteTemplate);
router.get("/:id",  getTemplateById );
router.get("/", authMiddleware,isAdmin,getAllTemplates);

module.exports = router;