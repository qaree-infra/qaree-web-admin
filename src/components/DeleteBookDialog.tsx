"use client";

import { moveBookToRecycleBinAction } from "@/app/actions";
import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SubmitButton } from "./SmartForm";
import { Form } from "./ui/form";

export function DeleteBookDialog({ bookId }: { bookId: string }) {
	const [open, setOpen] = React.useState(false);

	const schema = z.object({
		id: z.string(),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			id: bookId,
		},
	});

	const onSubmit = async () => {
		const { success, message } = await moveBookToRecycleBinAction(bookId);
		if (!success) {
			return toast.error(message);
		}
		setOpen(false);
		toast.success(message);
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button size={"icon"} variant={"outline"}>
					<Trash2 className="size-5" />
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent className="sm:max-w-md">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
						<AlertDialogHeader className="mb-8">
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete your
								account and remove your data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<div className="w-32">
								<SubmitButton>Continue</SubmitButton>
							</div>
						</AlertDialogFooter>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
