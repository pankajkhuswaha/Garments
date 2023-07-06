const express = require("express");
const {
  createQuantity,
  updateQuantity,
  deleteQuantity,
  getQuantity,
  getallQuantity,
} = require("../controller/quantityCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createQuantity);
router.put("/:id", authMiddleware, isAdmin, updateQuantity);
router.delete("/:id", authMiddleware, isAdmin, deleteQuantity);
router.get("/:id", getQuantity);
router.get("/",authMiddleware,isAdmin, getallQuantity);

module.exports = router;
