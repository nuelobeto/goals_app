const express = require("express");
const router = express.Router();
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getAllGoals,
} = require("../controllers/goalController");
const {
  requiresAuth,
  requiresAdminAuth,
} = require("../middleware/authMiddleware");

router.get("/", requiresAdminAuth, getAllGoals);

router.get("/currentUser", requiresAuth, getGoals);

router.post("/currentUser", requiresAuth, createGoal);

router.put("/currentUser/:id", requiresAuth, updateGoal);

router.delete("/currentUser/:id", requiresAuth, deleteGoal);

module.exports = router;
