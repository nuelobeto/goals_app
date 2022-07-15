const express = require("express");
const router = express.Router();
const {
  getUsers,
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const {
  requiresAuth,
  requiresAdminAuth,
} = require("../middleware/authMiddleware");

// get request
router.get("/", requiresAdminAuth, getUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/currentUser", requiresAuth, currentUser);

module.exports = router;
