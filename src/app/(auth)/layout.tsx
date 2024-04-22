import ThemeToggle from "@/components/ThemeToggle";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
	const user = await getServerSession(authOptions);

	if (user) {
		redirect("/dashboard");
	}

	return (
		<div className="h-full flex flex-col">
			<div className="flex justify-end py-5 container">
				<ThemeToggle />
			</div>
			{children}
		</div>
	);
}

export default Layout;
