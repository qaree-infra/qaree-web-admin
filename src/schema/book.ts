import { options } from "@/lib/config/book-status-items";
import { z } from "zod";

const errors = {
	status: "Select book status",
	content: "Write your review",
	icon: "",
	name: "",
	background: "",
};

const invalid = {
	status: "Invalid status option!",
	content: "The review should be at least 10 characters long",
	name: "",
	hex_color: "",
};

export const reviewSchema = z.object({
	status: z.enum(options, {
		errorMap: (issue) => {
			if (issue.code === "invalid_enum_value" && issue.received !== "") {
				return { message: invalid.status };
			}
			return { message: errors.status };
		},
	}),
	content: z
		.string({
			required_error: errors.content,
		})
		.min(10, {
			message: invalid.content,
		}),
});

export const categorySchema = z.object({
	icon: z
		.instanceof(File, {
			message: errors.icon,
		})
		.optional(),
	name_en: z
		.string({ required_error: errors.name })
		.min(3, { message: invalid.name }),
	name_ar: z
		.string({ required_error: errors.name })
		.min(3, { message: invalid.name }),
	background: z
		.string({ required_error: errors.background })
		.min(3, { message: invalid.hex_color }),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
export type CategorySchema = z.infer<typeof categorySchema>;
