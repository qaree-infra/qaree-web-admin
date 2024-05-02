import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/config/site";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `${siteConfig.name} - %s`,
	},
	description: siteConfig.description,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<body className={cn("flex h-full antialiased", inter.className)}>
				<Providers>
					<div className="flex-1">{children}</div>
				</Providers>
				<Toaster
					richColors
					closeButton
					visibleToasts={3}
					position="top-center"
				/>
			</body>
		</html>
	);
}
