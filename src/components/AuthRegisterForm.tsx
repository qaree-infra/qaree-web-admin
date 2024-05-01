"use client";

import { Form } from "./ui/form";

import { type RegisterSchema, registerSchema } from "@/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormInput, SubmitButton } from "./SmartForm";

import { toast } from "sonner";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

import { registerAction } from "@/app/actions";
import Link from "next/link";
import { useState } from "react";
import AuthVerificationForm from "./AuthVerificationForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

function AuthRegisterForm() {
	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
		},
	});

	const [currentStep, setCurrentStep] = useState(0);

	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const onSubmit = async (values: RegisterSchema) => {
		const { email, name, password } = values;

		if (!email || !password || !name) {
			return toast.error("Form data is not valid");
		}

		const state = await registerAction(values);

		if (!state.success) {
			return toast.error(state.message);
		}

		toast.success(state.message);
		setLoginData({
			email,
			password,
		});
		setCurrentStep(1);
	};

	return (
		<Card className="w-full max-w-lg transition-all">
			{currentStep === 0 ? (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
						<CardHeader className="space-y-3">
							<CardTitle className="text-2xl">Create an account</CardTitle>
							<CardDescription>
								Enter your email below to create your account
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									toast.error("feature is not ready yet");
								}}
							>
								<Icons.google className="mr-2 h-4 w-4" />
								Google
							</Button>
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										Or continue with
									</span>
								</div>
							</div>
							<FormInput
								form={form}
								name="name"
								type="text"
								label="Name"
								placeholder="Enter your name"
							/>

							<FormInput
								form={form}
								name="email"
								label="Email"
								type="email"
								placeholder="Enter your email address"
							/>
							<FormInput
								form={form}
								name="password"
								type="password"
								label="Password"
								placeholder="Enter password"
							/>
						</CardContent>
						<CardFooter className="flex flex-col">
							<SubmitButton>Create account</SubmitButton>
							<p className="text-sm text-muted-foreground w-full mt-5">
								Already have account?{" "}
								<Link href={"/signin"} className="hover:underline">
									Sign in
								</Link>
							</p>
						</CardFooter>
					</form>
				</Form>
			) : (
				<AuthVerificationForm userData={loginData} />
			)}
		</Card>
	);
}

export default AuthRegisterForm;
