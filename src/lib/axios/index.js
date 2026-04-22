import axios from "axios"
import { handleApiError } from "@/utils/api/error-handler"
import { showToast } from "@/lib/toast"
import { env } from "@/config/env"

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
    const formattedError = handleApiError(error)
    if (error) {

      console.log("Error in ", formattedError.message)
      showToast.error(formattedError.message)
    }

    return Promise.reject(error)
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