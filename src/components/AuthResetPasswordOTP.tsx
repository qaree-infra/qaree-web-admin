"use client";

import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

import { Form } from "./ui/form";

import {
	resendResetPasswordOTPAction,
	validateResetPasswordOTPAction,
} from "@/app/actions";
import {
	type VerifyAccountSchemaType,
	verifyAccountFormSchema,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormInputOTP, SubmitButton } from "./SmartForm";

function AuthResetPasswordOTP({ email }: { email: string }) {
	const form = useForm<VerifyAccountSchemaType>({
		resolver: zodResolver(verifyAccountFormSchema),
		defaultValues: {
			otp: "",
		},
	});

	const onSubmit = async (values: { otp: string }) => {
		const state = await validateResetPasswordOTPAction({
			email,
			otp: values.otp,
		});

		if (state && !state?.success) {
			return toast.error(state.message);
		}

		// Redirect to password reset form upon successful validation
		// along with the reset token for authorizatiosn
	};

	const resendHandler = async () => {
		try {
			const res = await resendResetPasswordOTPAction({
				email,
			});

			if (!res.success) {
				throw Error(res.message);
			}

			toast.success(res.message);
		} catch (error) {
			if (error instanceof Error) {
				return toast.error(error.message);
			}
			toast.error("Unexpected Error");
		}
	};

	return (
		<>
			<CardHeader className="space-y-3">
				<CardTitle className="text-2xl">Enter OTP</CardTitle>
				<CardDescription>
					Qaree just sent you a 6-Digit Code to{" "}
					<span className="text-secondary-foreground">{email}</span> please
					check your inbox and enter the code below
				</CardDescription>
			</CardHeader>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
					<CardContent className="flex justify-center">
						<FormInputOTP form={form} name="otp" />
					</CardContent>
					<CardFooter className="flex flex-col gap-2">
						<SubmitButton>Verify Code</SubmitButton>
						<div className="text-sm text-muted-foreground w-full mt-5">
							Didn`t receive the code?{" "}
							<button
								type="button"
								className="hover:text-secondary-foreground transition"
								onClick={resendHandler}
							>
								Send again
							</button>
						</div>
					</CardFooter>
				</form>
			</Form>
		</>
	);
}

export default AuthResetPasswordOTP;
