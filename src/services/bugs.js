import { api } from "@/lib/axios";
import { ROUTES } from "../constants/routes";

export const createBug = async (data) => {
    try {
        const res = await api.post(ROUTES.API_ROUTES.CREATEBUG(data.project), data);
        console.log("Create bug response", res.data);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
export const getAllBugs = async () => {
    try {
        const res = await api.get(ROUTES.API_ROUTES.ALLBUGS);
        console.log("Get all bugs response", res.data);
        return res.data.bugs;
    } catch (error) {
        throw error;
    }
}
export const getDevelopersByProject = async (projectId) => {
    try {
      const res = await api.get(ROUTES.API_ROUTES.DEVSBYPROJECT(projectId));
      console.log("Get developers by project response", res.data);
      return res.data.developers;
    } catch (error) {
      throw error;
    }
  };