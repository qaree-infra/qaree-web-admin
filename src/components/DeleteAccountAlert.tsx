"use client";

import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialogHeader,
	AlertDialogFooter,
} from "./ui/alert-dialog";

import React from "react";
import { Button } from "./ui/button";

import { useState } from "react";
import { deleteAccountAction } from "@/app/actions";
import { toast } from "sonner";

function DeleteAccountAlert() {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const onSubmit = async () => {
		setLoading(true);
		const state = await deleteAccountAction();
		if (!state?.success) {
			setLoading(false);
			return toast.error(state?.message);
		}
		// if sucess will be redirect from the server action
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" className="w-full">
					Delete Account
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button
						isLoading={loading}
						variant={"destructive"}
						onClick={onSubmit}
					>
						Continue
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteAccountAlert;
