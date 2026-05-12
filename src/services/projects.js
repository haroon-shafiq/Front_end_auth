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

export const getProject = async (page,limit) => {
    try{
        const res = await api.get(ROUTES.API_ROUTES.GETPROJECT(page,limit));
        console.log("Get projects response",res.data);
        return res.data;
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

export const getALLProjects = async (page,limit) => {
    try {
        const res = await api.get(ROUTES.API_ROUTES.GETPROJECTS(page, limit));
        console.log("Get all projects response", res.data);
        return res.data.projects;
    } catch (error) {
        throw error;
    }
}
export const getProjectsByDeveloper = async (page, limit) => {
  try {
    const res = await api.get(ROUTES.API_ROUTES.PROJECTIDBYDEV(page, limit));
    console.log("Get projects by developer response", res.data);
    return res.data.projectIds || [];
  } catch (error) {
    throw error;
  }
};
export const deleteProject = async (projectID) => {
  try{
    const res = await api.delete(ROUTES.API_ROUTES.DELETEPROJECT(projectID));
    return res.data;
  }catch(error){
    throw error;
  }
}