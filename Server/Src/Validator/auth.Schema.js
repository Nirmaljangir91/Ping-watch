import { z } from 'zod';

export const registerSchema = z.object({

body: z.object({

name: z.string().trim().min(2, 'Name is too short').max(80),

email: z.string().trim().toLowerCase().email('Enter a valid email'),

password: z.string().min(8, 'Min 8 characters').max(72),

}).strict(),

});

export const loginSchema = z.object({

body: z.object({

email: z.string().trim().toLowerCase().email('Enter a valid email'),

password: z.string().min(1, 'Password is required'),

}).strict(),

});