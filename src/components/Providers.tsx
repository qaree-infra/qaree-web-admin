"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
	// todo fix hydrating error when hard refresh with light mode
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<SessionProvider>{children}</SessionProvider>
		</ThemeProvider>
	);
}

export default Providers;
