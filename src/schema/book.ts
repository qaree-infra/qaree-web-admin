import { options } from "@/lib/config/book-status-items";
import { z } from "zod";

const errors = {
	status: "Select book status",
	content: "Write your review",
	icon: "Upload the category icon",
	name: "Enter the name",
	background: "Pick a background color",
	percent: "Enter the percent value",
	expireAt: "Enter the expire date",
	expired_date: "Expire date must be a future date",
};

const invalid = {
	status: "Invalid status option!",
	content: "The review should be at least 10 characters long",
	name: "Name should be at least 3 characters long",
	hex_color: "Invalid hexadecimal color value",
	number: "Enter a number",
	discount: "This dscount is not valid",
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

export type CategorySchema = z.infer<typeof categorySchema>;
export type CategorySchemaWithoutIcon = Omit<CategorySchema, "icon">;

export const offerSchema = z.object({
	percent: z.coerce
		.number({
			required_error: errors.percent,
			// FIXME: invalid error shown instead required
			invalid_type_error: invalid.number,
		})
		.min(0, {
			message: invalid.discount,
		}),
	expireAt: z
		.date({
			required_error: errors.expireAt,
		})
		.refine(
			(date) => {
				const now = new Date();
				return date > now;
			},
			{
				message: errors.expired_date,
			},
		),
});

export type OfferSchema = z.infer<typeof offerSchema>;
