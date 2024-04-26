"use client";

import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormSelect, SubmitButton } from "./SmartForm";
import { bookStatusItems, options } from "@/lib/config/book-status-items";

type Props = {
	bookId: string;
};

const reviewSchema = z.object({
	status: z.enum(options, {
		errorMap: (issue) => {
			if (issue.code === "invalid_enum_value" && issue.received !== "") {
				return { message: "Invalid option!" };
			}
			return { message: "Select book status" };
		},
	}),
	content: z
		.string({
			required_error: "Write your review",
		})
		.min(10, {
			message: "The review should be at least 10 characters long",
		}),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

function AdminReviewForm({ bookId }: Props) {
	const form = useForm<ReviewSchema>({
		mode: "onBlur",
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			status: undefined,
			content: "",
		},
	});

	const onSubmit = (values: ReviewSchema) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormSelect
					form={form}
					name="status"
					placeholder="select status"
					label="Status"
					showLabel
					items={bookStatusItems}
				/>
				<FormInput form={form} name="content" label="Content" />
				<SubmitButton />
			</form>
		</Form>
	);
}

export default AdminReviewForm;
