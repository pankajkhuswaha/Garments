const express = require("express");
const { updateOrder } = require("../controller/orderCnrl");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  cartdeletebyId,
  removeFromWishlist,
  updateCart,
  updateRole,
 
} = require("../controller/userCtrl");

const { authMiddleware, isAdmin, isSuper } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgetPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/all-users", authMiddleware,isAdmin,getallUser);
router.get("/get-orders", authMiddleware,isAdmin, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.post("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.put("/cart/update",authMiddleware,updateCart)
router.put("/order/status",updateOrder);
router.delete(`/carts/:id`, authMiddleware, cartdeletebyId);
router.delete('/wishlist/:id',authMiddleware,removeFromWishlist)
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);
router.put(
  "/order/update-order/:id",
  authMiddleware,
  updateOrderStatus
);


router.put("/edit-user", authMiddleware,updatedUser);
router.put("/edit-role/:id", authMiddleware,isAdmin,isSuper,updateRole);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id",authMiddleware,isAdmin,isSuper, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, isSuper,unblockUser);


module.exports = router;
