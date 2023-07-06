const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  getAllproductAdmin
 
 
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware, isSuper } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/", getAllProduct);
router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/admin", authMiddleware,isAdmin,getAllproductAdmin);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);






module.exports = router;
