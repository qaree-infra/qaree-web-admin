"use client";

import { type OfferSchema, offerSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { toast } from "sonner";
import { FormInput, SubmitButton } from "./SmartForm";
import { FormDate } from "./FormDate";

// props
// type, bookId, offer
// type create & bookId
// type edit & offer el

export function OfferAction() {
	const onSubmit = async (values: OfferSchema) => {
		toast.info(
			<pre className="text-wrap">{JSON.stringify(values, null, 2)}</pre>,
		);
	};
	const form = useForm<OfferSchema>({
		mode: "onSubmit",
		resolver: zodResolver(offerSchema),
		defaultValues: {
			percent: undefined,
			expireAt: undefined,
		},
	});

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-xl space-y-5"
				>
					<FormInput
						form={form}
						name="percent"
						label="Discount"
						placeholder="Enter amount"
					/>

					<FormDate form={form} name="expireAt" label="Expire date" />

					<SubmitButton />
				</form>
			</Form>
		</div>
	);
}
