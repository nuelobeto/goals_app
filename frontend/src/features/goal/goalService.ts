import axios from "axios";
import { goalTXType } from "../../types/goalTypes";

const API_URL = "http://localhost:5000/api/goals/";

// create goals
const createGoal = async (goal: goalTXType, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "currentUser", goal, config);

  return response.data;
};

// get goals
const getGoals = async (token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "currentUser", config);

  return response.data;
};

// delete goal
const deleteGoal = async (_id: string, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "currentUser/" + _id, config);

  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
