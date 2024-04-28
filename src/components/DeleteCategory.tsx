import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { deleteCategoryAction } from "@/app/actions";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "./ui/form";
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
import { Trash2 } from "lucide-react";
import { FormInput, SubmitButton } from "./SmartForm";
const seleteSchema = z.object({
	id: z.string(),
});

type DeleteSchema = z.infer<typeof seleteSchema>;

export function DeleteCategory({ id }: { id: string }) {
	const [open, setOpen] = useState(false);

	const onSubmit = async ({ id }: DeleteSchema) => {
		if (!id) {
			return toast.error("Invalid category id!");
		}
		const { success, message } = await deleteCategoryAction(id);
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
								Are you absolutely sure you want to delete this category? This
								action cannot be undone. It will permanently remove the category
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

export default DeleteCategory;
