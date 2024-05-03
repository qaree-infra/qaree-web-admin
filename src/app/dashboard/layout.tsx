import { Spinner } from "@/components/Spinner";
import { Aside } from "@/components/layouts/Aside";
import { BreadcrumbNav } from "@/components/layouts/BreadcrumbNav";
import { MobileSheet } from "@/components/layouts/MobileSheet";
import { SearchForm } from "@/components/layouts/SearchForm";
import UserNav from "@/components/layouts/UserNav";
import { Button } from "@/components/ui/button";
import { type ReactNode, Suspense } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen  flex-col  bg-muted/40">
			<Aside />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<header className="sticky top-0 z-30 mb-4 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
					<MobileSheet />
					<BreadcrumbNav />
					<SearchForm />
					<Suspense
						fallback={
							<Button size={"icon"} className="bg-muted rounded-full" />
						}
					>
						<UserNav />
					</Suspense>
				</header>
				<main className="grid max-sm:pb-20 flex-1 items-start gap-4 px-4 sm:px-6 sm:py-0 md:gap-8">
					{children}
				</main>
			</div>
		</div>
	);
}
