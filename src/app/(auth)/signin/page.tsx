import AuthLoginForm from "@/components/AuthLoginForm";
import CenteredWrapper from "@/components/CenteredWrapper";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "Sign In",
	description: "Sign in to Qaree publish service",
};

function Login() {
	return (
		<CenteredWrapper>
			<AuthLoginForm />
		</CenteredWrapper>
	);
}

export default Login;
