"use client";

import { forgotPasswordAction } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AuthResetPasswordOTP from "./AuthResetPasswordOTP";
import { FormInput, SubmitButton } from "./SmartForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";

const emailEnterySchema = z.object({
	email: z.string().email(),
});

function AuthEmailEnteryForm() {
	const form = useForm<z.infer<typeof emailEnterySchema>>({
		resolver: zodResolver(emailEnterySchema),
		defaultValues: {
			email: "",
		},
	});

	const [showNext, setShowNext] = useState(false);
	const [emailValue, setEmailValue] = useState("");

	const onSubmit = async (values: z.infer<typeof emailEnterySchema>) => {
		const { success } = z
			.object({
				email: z.string().email(),
			})
			.safeParse(values);

		if (!success) {
			toast.error("Invalid email");
		}
		setEmailValue(values.email);

		try {
			const { success, message } = await forgotPasswordAction(values.email);
			if (!success) {
				throw Error(message);
			}
			toast.success(message);
			setShowNext(true);
		} catch (error) {
			if (error instanceof Error) {
				return toast.error(error.message);
			}
			toast.error("Something went wrong!");
		}
	};

	return (
		<Card className="w-full max-w-lg">
			{!showNext ? (
				<>
					<CardHeader className="space-y-2">
						<CardTitle className="text-2xl">Forgot Password</CardTitle>
						<CardDescription>
							Please provide your email address. If your account is valid, an
							OTP will be sent to reset your password.
						</CardDescription>
					</CardHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
							<CardContent className="grid gap-4">
								<FormInput
									form={form}
									name="email"
									label="Email"
									type="email"
									placeholder="Enter your email address"
								/>
							</CardContent>
							<CardFooter className="flex flex-col">
								<SubmitButton>Send OTP</SubmitButton>
								<Link
									href={"/signin"}
									className="text-sm text-muted-foreground w-fit self-start mt-5 hover:underline"
								>
									Back to sign in
								</Link>
							</CardFooter>
						</form>
					</Form>
				</>
			) : (
				<AuthResetPasswordOTP email={emailValue} />
			)}
		</Card>
	);
}

export default AuthEmailEnteryForm;
