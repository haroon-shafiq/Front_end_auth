export const handleApiError = (error) => {

  if (!error) {
    return {
      status: 0,
      message: "Unknown error occurred",
    }
  }


  if (
    error?.code === "ECONNABORTED" ||
    error?.message?.includes("timeout")
  ) {
    return {
      status: 0,
      message: "Request timed out. Check your connection.",
    }
  }

  if (error?.code === "ERR_NETWORK") {
    return {
      status: 0,
      message: "Network error. Please check your internet.",
    }
  }


  if (error?.response) {
    const status = error.response.status
    const raw = error.response.data?.message || error.response.data?.errors[0].msg

    let message = null

    if (Array.isArray(raw)) {
      message = raw[0]
    } else if (typeof raw === "object" && raw !== null) {
      message = JSON.stringify(raw)
    } else if (typeof raw === "string" && raw.trim() !== "") {
      message = raw
    } else {
      message = null
    }

    switch (status) {
      case 400:
        return {
          status,
          message: message || "Bad request",
        }

      case 401:
        return {
          status,
          message: message || "Unauthorized. Please login again.",
        }

      case 403:
        return {
          status,
          message: "You do not have permission.",
        }

      case 404:
        return {
          status,
          message: message || 'Resource not found',
        }

      case 409:
        return {
          status,
          message: message || "User already exists",
        }

      case 422:
        return {
          status,
          message: message || "Validation error.",
        }

      case 500:
        return {
          status,
          message: message || "Server error. Try again later.",
        }

      default:
        return {
          status: status || 0,
          message:
            message ||
            error?.message ||
            "Something went wrong",
        }
    }
  }

  return {
    status: 0,
    message: error?.message || "Something went wrong",
  }
}