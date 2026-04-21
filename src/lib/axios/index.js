import axios from "axios"
import { handleApiError } from "@/utils/api/error-handler"
import { showToast } from "@/lib/toast"

export const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  withCredentials: true
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const formattedError = handleApiError(error)
    showToast.error(formattedError.message)

    return Promise.reject(formattedError)
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