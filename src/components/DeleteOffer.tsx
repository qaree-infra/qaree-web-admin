import { deleteOfferAction } from "@/app/actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { string, z } from "zod";
import { FormInput, SubmitButton } from "./SmartForm";
import { Button, buttonVariants } from "./ui/button";
import { Form } from "./ui/form";
const seleteSchema = z.object({
	id: z.string(),
});

type DeleteSchema = z.infer<typeof seleteSchema>;

export function DeleteOffer({ id }: { id: string }) {
	const [open, setOpen] = useState(false);

	const onSubmit = async ({ id }: DeleteSchema) => {
		if (!id) {
			return toast.error("Invalid category id!");
		}
		const { success, message } = await deleteOfferAction(id);
		if (!success) {
			return toast.error(message);
		}
		toast.success(message);
		setOpen(false);
	};

	const form = useForm({
		resolver: zodResolver(seleteSchema),
		defaultValues: {
			id: "",
		},
	});

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant="outline"
					size={"icon"}
					onClick={() => {
						form.reset({ id });
					}}
				>
					<Trash2 className="size-5" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								Are you absolutely sure you want to delete this offer? This
								action cannot be undone. It will permanently remove the offer
								and all associated data.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<FormInput form={form} name="id" type="hidden" />
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction asChild>
								<SubmitButton
									className={buttonVariants({
										variant: "destructive",
										className: "w-32",
									})}
								>
									Continue
								</SubmitButton>
							</AlertDialogAction>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteOffer;
