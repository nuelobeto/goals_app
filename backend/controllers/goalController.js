const Goal = require("../models/goalModel");
// const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// get request
const getAllGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals.length);
});

// get request
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// post request
const createGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// put request
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // const user = await User.findById(req.user.id);

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("unauthorized");
  }

  const updatedGoal = await Goal.findOneAndUpdate(
    req.params.id,
    { text: req.body.text },
    {
      new: true,
    }
  );

  res.status(200).json(updatedGoal);
});

// delete request
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // const user = await User.findById(req.user.id);

  if (!req.user) {
    res.status(401);
    throw new Error("unauthorized");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("unauthorized");
  }

  await goal.remove();

  res.status(200).json(goal);
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getAllGoals,
};
