import { api } from "@/lib/axios";
import { ROUTES } from "../constants/routes";

export const createBug = async (data) => {
    try {
        const res = await api.post(ROUTES.API_ROUTES.CREATEBUG(data.project), data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Create bug response", res.data);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
export const updateBug = async(bugID, data) => {
    try{
        const res = await api.patch(
          ROUTES.API_ROUTES.UPDATEBUGBYID(bugID), 
          {
            title: data.title,
            deadline: data.deadline,
            description: data.description,
            type: data.type,
            status: data.status,
          }
        );
        console.log("Updated Bug", res.data);
        return res.data;
    }catch(error){
        throw error
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
  export const UploadImage = async (bugID, formData) => {
  try {
    const res = await api.patch(
      ROUTES.API_ROUTES.UPLOAD_IMAGE(bugID),
      formData
    );

    return res.data.url;
  } catch (error) {
    throw error;
  }
};
export const GetBugByID = async (bugID) => {
    try{
        const res = await api.get(ROUTES.API_ROUTES.GETBUGBYID(bugID));
        console.log("Respone", res);
        return res.data;
    } catch (error) {
        console.error("New Error", error);
        throw error;
    }
}
export const DeleteBug = async (bugID) => {
    try{
        const res = await api.delete(ROUTES.API_ROUTES.DELETEBUG(bugID));
        return res.data;
    }catch(error){
        console.error("New error", error)
        throw error;
    }
}

export const UpdateStatus = async (bugID, data) => {
    try{
        const res = await api.patch(ROUTES.API_ROUTES.UPDATESTATUS(bugID), data)
        return res.data;
    }catch(error){
        console.error("New error", error);
        throw error;
    }
}