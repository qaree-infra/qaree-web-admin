import Link from "next/link";
import React from "react";

import { type IconKey, Icons } from "../Icons";
import { Button } from "../ui/button";

interface NavItemType {
	label: string;
	icon: IconKey;
	href: string;
}
export const navItems: NavItemType[] = [
	{
		label: "Home",
		href: "/dashboard",
		icon: "book",
	},
	{
		label: "Add New Book",
		href: "/dashboard/publish",
		icon: "plus",
	},
	{
		label: "Manage Books",
		href: "/dashboard/manage",
		icon: "text",
	},
	{
		label: "Royalties",
		href: "/dashboard/royalties",
		icon: "dollar",
	},
	{
		label: "Help",
		href: "/dashboard/help",
		icon: "help",
	},
];

function SideNav() {
	return (
		<div className="border-r max-lg:hidden">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-[60px] items-center border-b px-6 gap-12">
					<Link
						className="flex items-center gap-2 font-semibold"
						href="/dashboard"
					>
						<Icons.book className="h-6 w-6" />
						<span className="">Publish Service</span>
					</Link>
					<Button className="ml-auto h-8 w-8" size="icon" variant="outline">
						<Icons.bell className="h-4 w-4" />
						<span className="sr-only">Toggle notifications</span>
					</Button>
				</div>
				<div className="flex-1 py-2">
					<nav className="grid items-start px-4 text-sm font-medium">
						{navItems.map((el) => {
							const Icon = Icons[el.icon];
							return (
								<Link
									className="flex items-center gap-3  px-3 py-2  transition text-muted-foreground hover:text-primary "
									href={el.href}
									key={el.label}
								>
									<Icon className="h-4 w-4" />
									{el.label}
								</Link>
							);
						})}
					</nav>
				</div>
			</div>
		</div>
	);
}

export default SideNav;
