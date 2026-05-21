import axios from "axios"
import { handleApiError } from "@/utils/api/error-handler"
import { showToast } from "@/lib/toast"
import { env } from "@/config/env"
import { getSession, signOut } from "next-auth/react"

export const api = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  withCredentials: true
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error("Error=====>>>>", error)
    if(error?.response.status == 401){
      signOut({ callbackUrl: "/signin" })
    }
    const formattedError = handleApiError(error)
    console.log("Formated error=====>>>>>", formattedError)
    
    if (error) {

      console.log("Error in ", formattedError.message)
      showToast.error(formattedError.message)
    }

    return Promise.reject(error)
  }
)
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    console.log("Sesssion______________+++++", session)
    if(session?.accessToken){
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
      return config
  },
  (error) => {
    // Promise.reject(error);
    console.error("Error", error)
  }

)
// api.interceptors.request.use((config) => {
//   // const token = localStorage.getItem("token")

//   // if (token) {
//   //   config.headers.Authorization = `Bearer ${token}`
//   // }
//   console.log("Config", config)
//     return config 

// }, (error) => Promise.reject(error) )