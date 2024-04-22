import { string, z } from "zod";

export const registerFormSchema = z.object({
	email: z.string().email(),
	name: z.string().min(3),
	password: z.string().min(4),
});

export const verifyAccountFormSchema = z.object({
	otp: z.string().length(6),
});

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(3),
});

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
export type RegisterSchemaType = z.infer<typeof registerFormSchema>;
export type VerifyAccountSchemaType = z.infer<typeof verifyAccountFormSchema>;
export type LoginSchemaType = z.infer<typeof loginFormSchema>;
