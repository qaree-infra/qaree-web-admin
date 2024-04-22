"use client";

import { resetPasswordAction } from "@/app/actions";
import {
	type ResetPasswordSchemaType,
	resetPasswordFormSchema,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInput, SubmitButton } from "./SmartForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";

function AuthResetPasswordForm({
	token,
}: {
	token: string;
}) {
	const email = useSearchParams().get("email");
	const router = useRouter();

	const onSubmit = async (values: ResetPasswordSchemaType) => {
		if (!values.password) {
			return toast.error("Invalid Value");
		}

		const { success, message } = await resetPasswordAction({
			newPassword: values.password,
			token,
		});

		if (!success) {
			return toast.error(message);
		}

		toast.success(message);

		const res = await signIn("credentials", {
			redirect: false,
			email,
			password: values.password,
		});

		if (res?.error) {
			return toast.error(`${res.error} Please try to login`);
		}

		router.push("/dashboard");
	};

	const form = useForm<ResetPasswordSchemaType>({
		resolver: zodResolver(resetPasswordFormSchema),
		defaultValues: {
			password: "",
			confirm_password: "",
		},
	});

	return (
		<Card className="w-full max-w-lg">
			<CardHeader className="space-y-2">
				<CardTitle className="text-2xl">Reset Password</CardTitle>
				<CardDescription>
					Generate a new password to regain access to your account.
				</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="grid gap-4">
						<FormInput
							form={form}
							label="New Password"
							type="password"
							name="password"
						/>

						<FormInput
							form={form}
							label="Confirm Password"
							name="confirm_password"
							type="password"
						/>

						<SubmitButton />
					</CardContent>
				</form>
			</Form>
		</Card>
	);
}

export default AuthResetPasswordForm;
