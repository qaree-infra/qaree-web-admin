import { z } from "zod";

export const registerSchema = z.object({
	email: z.string().email(),
	name: z.string().min(3),
	password: z.string().min(4),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const verifyAccountFormSchema = z.object({
	otp: z.string().length(6),
});
export type VerifyAccountSchemaType = z.infer<typeof verifyAccountFormSchema>;

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3),
});
export type LoginSchemaType = z.infer<typeof loginFormSchema>;

export const resetPasswordFormSchema = z
	.object({
		password: z.string().min(8),
		confirm_password: z.string(),
	})
	.refine((arg) => arg.password === arg.confirm_password, {
		message: "The passwords did not match",
		path: ["confirm_password"],
	});
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordFormSchema>;
