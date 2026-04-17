import { z } from "zod"

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters bro "),

  email: z
    .string()
    .email("Please enter a valid email like example@gmail.com"),

  password: z
    .string()
    .min(6, "Password too weak! Minimum 6 characters required"),
})