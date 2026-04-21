import { toast } from "sonner"

export const showToast = {
  success: (message) => {
    toast.success("", {
      description: message,
      duration: 1500
    })
  },

  error: (message) => {
    toast.error("", {
      description: message,
      duration: 2000
    })
  },
}
