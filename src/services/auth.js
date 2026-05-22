import { api } from "@/lib/axios";
import { ROUTES } from "../constants/routes.js"
import { env } from "@/config/env.js";
import axios from "axios";


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
// export const RefreshToken = async (token) => {
//   try {
//     const res = await api.post(
//       ROUTES.API_ROUTES.REFRESHTOKEN,
//       {
//         userId: token.id,
//       }
//     );
//     console.log("res in refresh token==>",res)

//     return res.data.newAccessToken;
//   } catch (error) {
//     console.error("Error in refresh Token", error);
//     throw error;
//   }
// };


export const RefreshToken = async (token) => {
  try {
    const res = await axios.post(
      `${env.apiUrl}${ROUTES.API_ROUTES.REFRESHTOKEN}`,
      { userId: token.id }, 
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      }
    );
    return res.data.newAccessToken;

  } catch (error) {
    console.error("Error in refresh Token", error);
    throw error;
  }
};
