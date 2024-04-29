import { Loader2 } from "@/components/Loader2";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Suspense } from "react";
import "../styles/globals.css";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	// metadataBase: new URL(siteConfig.links.url),
	openGraph: {
		type: "website",
		locale: "ar_EG",
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		// images: [`${siteConfig.url}/og.jpg`],
		creator: "@mohamedtsx",
	},
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
					<Suspense fallback={<Loader2 />}>
						<div className="flex-1">{children}</div>
					</Suspense>
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
