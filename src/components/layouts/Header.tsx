import { Suspense } from "react";
import { MobileMenu } from "../MobileMenu";
import { Spinner } from "../Spinner";
import ThemeToggle from "../ThemeToggle";
import UserNav from "./UserNav";
import SearchForm from "./SearchForm";

function Header() {
	return (
		<header className="border-b max-lg:bg-muted/40">
			<div className="container lg:h-[60px] flex justify-between h-14 items-center gap-4">
				<div className="flex gap-2">
					<div className="lg:hidden">
						<MobileMenu />
					</div>
					<SearchForm />
				</div>
				<div className="flex items-center gap-4">
					<div className="max-lg:hidden">
						<ThemeToggle />
					</div>
					<Suspense fallback={<Spinner />}>
						<UserNav />
					</Suspense>
				</div>
			</div>
		</header>
	);
}

export default Header;
