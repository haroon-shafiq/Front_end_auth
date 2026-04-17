import { api } from "@/lib/axios";
import { API_ROUTES } from "@/constants/api-routes";
import { handleApiError } from "@/utils/api/error-handler";

export const registerUser = async (data) => {
  try {
    const res = await api.post(API_ROUTES.REGISTER, data);
    return res.data;
  } catch (error) {
    const formattedError = handleApiError(error);
    console.log("Error", error);
    throw handleApiError(formattedError);
  }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post(API_ROUTES.LOGIN, data);
    return res.data;
  } catch (error) {
    const formattedError = handleApiError(error);
    console.log("Error", error);
    throw handleApiError(formattedError);
  }
};
