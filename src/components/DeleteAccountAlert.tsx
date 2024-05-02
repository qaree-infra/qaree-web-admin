"use client";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";

import { Button } from "./ui/button";

import { deleteAccountAction } from "@/app/actions";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function DeleteAccountAlert() {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const { update } = useSession();

	const onSubmit = async () => {
		setLoading(true);
		const state = await deleteAccountAction();
		if (!state?.success) {
			setLoading(false);
			return toast.error(state.message);
		}

		router.push("/");
		toast.success(state.message);
		signOut({ callbackUrl: "", redirect: false });
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
						className="w-32"
					>
						Continue
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteAccountAlert;
