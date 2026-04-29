import { api } from "@/lib/axios";
import {ROUTES} from "@/constants/routes.js";

export const createProject = async (data) => {
    try{
        const res = await api.post(ROUTES.API_ROUTES.CREATEPROJECT, data);
        return res.data.project;
    }
    catch(error){
        throw error;
    }
}

export const getProject = async () => {
    try{
        const res = await api.get(ROUTES.API_ROUTES.GETPROJECT);
        console.log("Get projects response",res.data);
        return res.data.projects;
    }
    catch(error){
        throw error;
    }
}
export const getDevelopers = async () => {
  try {
    const res = await api.get(ROUTES.API_ROUTES.GETALLDEVS);
    console.log("Get developers response", res.data);
    return res.data.developers;
    
  } catch (error) {
    throw error;
  }
};

export const getALLProjects = async () => {
    try {
        const res = await api.get(ROUTES.API_ROUTES.GETPROJECTS);
        console.log("Get all projects response", res.data);
        return res.data.projects;
    } catch (error) {
        throw error;
    }
}
export const getProjectsByDeveloper = async () => {
  try {
    const res = await api.get(ROUTES.API_ROUTES.PROJECTIDBYDEV);
    console.log("Get projects by developer response", res.data);
    return res.data.projectIds || [];
  } catch (error) {
    throw error;
  }
};