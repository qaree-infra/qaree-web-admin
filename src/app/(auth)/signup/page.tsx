import AuthRegisterForm from "@/components/AuthRegisterForm";
import CenteredWrapper from "@/components/CenteredWrapper";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "Sign Up",
	description: "Sign up to Qaree publish service",
};

function SignUp() {
	return (
		<CenteredWrapper>
			<AuthRegisterForm />
		</CenteredWrapper>
	);
}

export default SignUp;
