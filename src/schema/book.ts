import { options } from "@/lib/config/book-status-items";
import { z } from "zod";

const errors = {
	status: "Select book status",
	content: "Write your review",
};

const invalid = {
	status: "Invalid status option!",
	content: "The review should be at least 10 characters long",
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

export type ReviewSchema = z.infer<typeof reviewSchema>;
