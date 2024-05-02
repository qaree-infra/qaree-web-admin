"use client";

import { type OfferSchema, offerSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { FormDate } from "./FormDate";
import { FormInput, SubmitButton } from "./SmartForm";
import { Form } from "./ui/form";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

import type { Offer } from "@/app/dashboard/offeres/columns";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

import { addOfferAction, editOfferAction } from "@/app/actions";
import { cn } from "@/lib/utils";

type AddProps = {
	bookId: string;
	type: "create";
};

type EditProps = {
	offer: Offer;
	type: "update";
};

type Props = (AddProps | EditProps) & {
	className?: string;
};

export function OfferAction(props: Props) {
	const [open, setOpen] = useState(false);
	const isUpdate = props.type === "update";

	const form = useForm<OfferSchema>({
		mode: "onSubmit",
		resolver: zodResolver(offerSchema),
		//@ts-expect-error
		defaultValues: async () => {
			if (isUpdate) {
				const { percent, expireAt } = props.offer;
				return {
					percent,
					expireAt: new Date(+expireAt),
				};
			}

			return {
				percent: undefined,
				expireAt: undefined,
			};
		},
	});

	const {
		formState: { isDirty },
	} = form;

	const onSubmit = async (values: OfferSchema) => {
		const expireAt = values.expireAt.toLocaleString();

		if (isUpdate) {
			if (!isDirty) {
				return toast.warning("No changes have been triggered!");
			}
			const { success, message } = await editOfferAction({
				id: props.offer._id,
				expireAt,
				percent: values.percent,
			});

			if (!success) {
				return toast.error(message);
			}
			toast.success(message);
		} else {
			const { success, message } = await addOfferAction({
				bookId: props.bookId,
				expireAt,
				percent: values.percent,
			});

			if (!success) {
				return toast.error(message);
			}

			toast.success(message);
		}

		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{props.type === "update" ? (
					<Button
						size={"icon"}
						variant={"outline"}
						// onClick={() => {
						// 	const { percent, expireAt } = props.offer;
						// 	form.reset({
						// 		percent,
						// 		expireAt: new Date(+expireAt),
						// 	});
						// }}
					>
						<Pencil className="size-5" />
					</Button>
				) : (
					<Button
						type="button"
						variant="blank"
						className={cn("w-full justify-start ", props.className)}
					>
						Add Offer
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-5"
						autoComplete="off"
					>
						<DialogHeader>
							<DialogTitle>Add / Edit Offer</DialogTitle>
							<DialogDescription>
								Provide new offer details or update existing ones. Ensure the
								discount amount is valid and select the expiration date.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-5">
							<FormInput
								form={form}
								name="percent"
								label="Discount"
								placeholder="Enter amount"
							/>

							<FormDate form={form} name="expireAt" label="Expire date" />
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<SubmitButton className="w-32" />
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
