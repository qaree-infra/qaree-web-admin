import { Aside } from "@/components/layouts/Aside";
import { MobileSheet } from "@/components/layouts/MobileSheet";
import { BreadcrumbNav } from "@/components/layouts/BreadcrumbNav";
import { SearchForm } from "@/components/layouts/SearchForm";
import UserNav from "@/components/layouts/UserNav";
import { Suspense, type ReactNode } from "react";
import { Spinner } from "@/components/Spinner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen  flex-col  bg-muted/40">
			<Aside />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
					<MobileSheet />
					{/* FIXME: Hydration Error */}
					{/* <BreadcrumbNav /> */}
					<SearchForm />
					<Suspense fallback={<Spinner />}>
						<UserNav />
					</Suspense>
				</header>
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					{children}
				</main>
			</div>
		</div>
	);
}
