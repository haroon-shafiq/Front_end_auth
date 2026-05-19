import { ROUTES } from "@/constants/routes"
import { api } from "@/lib/axios";

export const getNotification = async () => {
    try{
        const result = await api.get(ROUTES.API_ROUTES.GETNOTIFICATIONS)
        console.log("Result=======>>>>>>>>", result);
        return result.data.notifications;
    }catch(error){
        console.error("Error====================>>>>>>>>>>>>>>>.", error)
        throw error;
    }
}