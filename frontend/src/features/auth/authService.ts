import axios from "axios";
import { UserLoginType, UserRegisterType } from "../../types/userType";

const API_URL = "http://localhost:5000/api/users/";

//register user
const register = async (userData: UserRegisterType) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login
const login = async (userData: UserLoginType) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//logout
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
