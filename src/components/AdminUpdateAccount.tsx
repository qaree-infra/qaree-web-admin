"use client";

import { updateAccountAction } from "@/app/actions";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type UpdateAccountSchema, updateAccountSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInput, SubmitButton } from "./SmartForm";
import { Form } from "./ui/form";

export function AdminUpdateAccount({ oldName }: { oldName: string }) {
	const form = useForm<UpdateAccountSchema>({
		mode: "onSubmit",
		resolver: zodResolver(updateAccountSchema),
		defaultValues: {
			name: oldName,
			oldPassword: "",
			newPassword: "",
		},
	});
	const onSubmit = async (values: UpdateAccountSchema) => {
		const { success, message } = await updateAccountAction(values);
		if (!success) {
			return toast.error(message);
		}
		toast.success(message);

		form.reset({
			name: form.getValues("name"),
			newPassword: "",
			oldPassword: "",
		});
	};

	return (
		<Card>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-3 h-full flex flex-col justify-between"
				>
					<CardHeader>
						<CardTitle>Update Account</CardTitle>
						<CardDescription>
							Update your name and password by providing the following
							information
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-5">
						<FormInput form={form} name="name" label="Name" />
						<FormInput
							form={form}
							name="oldPassword"
							label="Old Password"
							type="password"
						/>
						<FormInput
							form={form}
							name="newPassword"
							label="New Password"
							type="password"
						/>
					</CardContent>
					<CardFooter>
						<SubmitButton />
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
