"use client";

import { reviewBookAction } from "@/app/actions";
import { bookStatusItems } from "@/lib/config/book-status-items";
import { type ReviewSchema, reviewSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSelect, FormTextare, SubmitButton } from "./SmartForm";
import { Form } from "./ui/form";

type Props = {
	bookId: string;
};

function AdminReviewForm({ bookId }: Props) {
	const form = useForm<ReviewSchema>({
		mode: "onBlur",
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			status: undefined,
			content: "",
		},
	});

	const onSubmit = async (values: ReviewSchema) => {
		const { success, message } = await reviewBookAction({
			bookId,
			review: values,
		});

		if (!success) {
			return toast.error(message);
		}
		toast.success(message);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="max-w-3xl space-y-5"
			>
				<FormSelect
					form={form}
					name="status"
					placeholder="select status"
					label="Status"
					showLabel
					items={bookStatusItems}
				/>
				<FormTextare
					form={form}
					name="content"
					label="Content"
					placeholder="Write your review here..."
				/>
				<SubmitButton />
			</form>
		</Form>
	);
}

export default AdminReviewForm;
