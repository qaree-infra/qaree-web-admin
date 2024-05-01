import { z } from "zod";

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

const errors = {
	name: "",
	oldPassword: "",
	newPassword: "",
	avatar: "",
};

const invalid = {
	name: "",
	newPassword: "",
};

export const updateAccountSchema = z.object({
	name: z
		.string({ required_error: errors.name })
		.min(3, { message: errors.name }),
	oldPassword: z.string().min(1, {
		message: errors.oldPassword,
	}),
	newPassword: z.string({ required_error: errors.newPassword }).min(8, {
		message: invalid.newPassword,
	}),
});

export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;

export const updateAvatarSchema = z.object({
	avatar: z.instanceof(File, {
		message: errors.avatar,
	}),
});
export type UpdateAvatarSchema = z.infer<typeof updateAvatarSchema>;

export const registerSchema = z.object({
	email: z.string().email(),
	name: z.string().min(3, {
		message: invalid.name,
	}),
	password: z.string().min(8, {
		message: invalid.newPassword,
	}),
});
export type RegisterSchema = z.infer<typeof registerSchema>;
