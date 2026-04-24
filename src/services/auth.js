import { api } from "@/lib/axios";
import { ROUTES } from "../constants/routes.js"


export const registerUser = async (data) => {
  try {
    const res = await api.post(ROUTES.API_ROUTES.REGISTER, data);
    return res.data;
  } catch (error) {
    throw error
  }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post(ROUTES.API_ROUTES.LOGIN, data);
    console.log("Login response", res);
    return res.data;
  } catch (error) {
    throw error
  }
};
export const Logout = async () => {
  try {
    const res = await api.post(ROUTES.API_ROUTES.LOGOUT);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const Getuser = async () => {
  try {
    const res = await api.get(ROUTES.API_ROUTES.GETUSER);
    console.log("Get user response", res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
