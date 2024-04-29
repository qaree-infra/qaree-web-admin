"use client";

import { type OfferSchema, offerSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { toast } from "sonner";
import { FormInput, SubmitButton } from "./SmartForm";
import { FormDate } from "./FormDate";

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
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import type { Offer } from "@/app/dashboard/offeres/columns";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

// type T = {
// 	type: "create" | "update";
// };

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
	// const isUpdate = props.type === "update";

	const onSubmit = async (values: OfferSchema) => {
		toast.info(<pre>{JSON.stringify(values, null, 2)}</pre>);
		
		setOpen(false);
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{props.type === "update" ? (
					<Button
						size={"icon"}
						variant={"outline"}
						onClick={() => {
							const { percent, expireAt } = props.offer;
							form.reset({
								percent,
								expireAt: new Date(expireAt),
							});
						}}
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
