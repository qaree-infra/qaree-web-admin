import { z } from "zod";

// todo write better error messages
const errors = {
	name: "Book name is required",
	cover: "Please upload a book cover image.",
	book: "Please upload a valid EPUB file",
	description: "Description is required",
	language: "Please select book language",
	publishingRights: "Please confirm publishing rights",
	isbn: "",
	edition: "",
	categories: "",
};

const invalid = {
	name: "Book name should be at least 3 characters",
	description: "Description should be at least 10 characters",
};

const filesSchema = z.object({
	cover: z.instanceof(File, {
		message: errors.cover,
	}),
	book: z.instanceof(File, {
		message: errors.book,
	}),
});

const bookDetailesSchema = z.object({
	name: z
		.string({
			required_error: errors.name,
		})
		.min(3, {
			message: invalid.name,
		}),
	description: z.string().min(10, { message: errors.description }),
	categories: z.array(z.string()),
	language: z
		.string({ required_error: errors.language })
		.min(1, { message: errors.language }),
	publishingRights: z.string({
		required_error: errors.publishingRights,
	}),
});

export type MediaType = z.infer<typeof filesSchema>;

export const publishDefaultValues: Omit<PublishSchemaType, keyof MediaType> = {
	name: "",
	categories: [],
	description: "",
	language: "",
	publishingRights: "",
};

export const editBookSchema = z.object({
	name: z
		.string({
			required_error: errors.name,
		})
		.min(3, {
			message: invalid.name,
		}),
	description: z
		.string({
			required_error: errors.description,
		})
		.min(10, {
			message: invalid.description,
		}),
	isbn: z
		.string({
			required_error: errors.isbn,
		})
		.optional(),
	edition: z.coerce.number().optional(),
	price: z.coerce.number().optional(),
	categories: z.array(z.string()),
	language: z
		.string({ required_error: errors.language })
		.min(1, { message: errors.language }),
	publishingRights: z.string({
		required_error: errors.publishingRights,
	}),
});

export type EditBookType = z.infer<typeof editBookSchema>;

export type AddBookDetailsSchemaType = z.infer<typeof bookDetailesSchema>;

export const publishSchema = bookDetailesSchema.and(filesSchema);
export type PublishSchemaType = z.infer<typeof publishSchema>;
