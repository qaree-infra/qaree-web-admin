import AuthEmailEnteryForm from "@/components/AuthEmailEnteryForm";
import CenteredWrapper from "@/components/CenteredWrapper";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Password",
};

function Page() {
	return (
		<CenteredWrapper>
			<AuthEmailEnteryForm />
		</CenteredWrapper>
	);
}

export default Page;
