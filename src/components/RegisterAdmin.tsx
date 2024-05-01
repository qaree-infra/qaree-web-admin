"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
	DialogClose,
	DialogFooter,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { FormInput, SubmitButton } from "./SmartForm";
import { Form } from "./ui/form";
import { registerAction } from "@/app/actions";
import { registerSchema, type RegisterSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const defaultValues = {
	email: "",
	name: "",
	password: "",
};

export function RegisterAdmin() {
	const [open, setOpen] = useState(false);

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues,
	});

	const onSubmit = async (values: RegisterSchema) => {
		const state = await registerAction(values);

		if (!state.success) {
			return toast.error(state.message);
		}

		toast.success(state.message);

		setOpen(false);
		form.reset(defaultValues);
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="flex gap-2" onClick={() => {}}>
					<Plus />
					<span>New Admin</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						autoComplete="off"
						className="space-y-5"
					>
						<DialogHeader>
							<DialogTitle>Add New Admin</DialogTitle>
							<DialogDescription>
								Register new admins here, granting full access and permissions
								within the system. Ensure these accounts are not included in any
								publishing processes
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-5">
							<FormInput
								form={form}
								name="name"
								type="text"
								label="Name"
								placeholder="New admin name"
							/>

							<FormInput
								form={form}
								name="email"
								label="Email"
								type="email"
								placeholder="Admin email"
							/>
							<FormInput
								form={form}
								name="password"
								type="password"
								label="Password"
							/>
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
