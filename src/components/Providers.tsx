"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { TooltipProvider } from "./ui/tooltip";

function Providers({ children }: { children: ReactNode }) {
	// todo fix hydrating error when hard refresh with light mode
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<SessionProvider>
				<TooltipProvider>{children}</TooltipProvider>
			</SessionProvider>
		</ThemeProvider>
	);
}

export default Providers;
