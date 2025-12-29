import { z } from 'zod';



export const AuthValidator = z.object({
    username: z.string()
        .trim()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(30, { message: "Username must be at most 30 characters long" }),

    password: z.string()
        .trim()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(100, { message: "Password must be at most 100 characters long" }),
});