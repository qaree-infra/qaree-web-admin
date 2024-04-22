import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Icons } from "./Icons";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { navItems } from "./layouts/SideNav";

export function MobileMenu() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size={"icon"} className="rounded-lg">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side={"left"} className="flex h-full flex-col p-0">
				<div className="py-12 flex-1">
					<div className="flex-1 py-2">
						<nav className="grid items-start px-4 text-sm font-medium">
							{navItems.map((el) => {
								const Icon = Icons[el.icon];
								return (
									<SheetClose asChild key={el.label}>
										<Link
											className="flex items-center gap-3  px-3 py-2  transition text-muted-foreground hover:text-primary "
											href={el.href}
										>
											<Icon className="h-4 w-4" />
											{el.label}
										</Link>
									</SheetClose>
								);
							})}
						</nav>
					</div>
				</div>
				<SheetFooter className="flex items-end p-6">
					<SheetClose asChild>
						<ThemeToggle />
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
