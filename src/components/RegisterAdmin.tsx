"use client";

import { registerAction } from "@/app/actions";
import { type RegisterSchema, registerSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInput, SubmitButton } from "./SmartForm";
import { Button } from "./ui/button";

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

import { Form } from "./ui/form";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
	DrawerClose,
} from "./ui/drawer";

export function RegisterAdmin() {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline" className="flex gap-2" onClick={() => {}}>
						<Plus />
						<span>New Admin</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-xl">
					<DialogHeader>
						<DialogTitle>Add New Admin</DialogTitle>
						<DialogDescription>
							Register new admins here, granting full access and permissions
							within the system. Ensure these accounts are not included in any
							publishing processes
						</DialogDescription>
					</DialogHeader>
					<RegisterForm setOpen={setOpen} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="flex gap-2" onClick={() => {}}>
					<Plus />
					<span>New Admin</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Add New Admin</DrawerTitle>
					<DrawerDescription>
						Granting full access and permissions within the system.
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-4 py-6">
					<RegisterForm setOpen={setOpen} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

const defaultValues: RegisterSchema = {
	email: "",
	name: "",
	password: "",
	confirmPassword: "",
};

const RegisterForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
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
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				autoComplete="off"
				className="space-y-5"
			>
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
					<FormInput
						form={form}
						name="confirmPassword"
						type="password"
						label="Confirm Password"
					/>
				</div>
				<div className="flex justify-end gap-4">
					<Button
						variant="outline"
						onClick={() => {
							setOpen(false);
						}}
					>
						Cancel
					</Button>
					<SubmitButton className="w-32" />
				</div>
			</form>
		</Form>
	);
};
