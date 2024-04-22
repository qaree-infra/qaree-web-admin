"use client";

import {
	Book,
	Home,
	LineChart,
	Package2,
	PencilRuler,
	Settings,
	Users2,
} from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ThemeToggle from "../ThemeToggle";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Item {
	name: string;
	href: string;
	icon: ReactNode;
}

const items: Item[] = [
	{
		name: "Dashboard",
		href: "/",
		icon: <Home size={20} />,
	},
	{
		name: "Books",
		href: "/books",
		icon: <Book size={20} />,
	},
	{
		name: "Updates",
		href: "/updates",
		icon: <PencilRuler size={20} />,
	},
	{
		name: "Users",
		href: "/users",
		icon: <Users2 size={20} />,
	},
	{
		name: "Analytics",
		href: "/analytics",
		icon: <LineChart size={20} />,
	},
	{
		name: "Account",
		href: "/account",
		icon: <Settings size={20} />,
	},
];
export function Aside() {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 py-4">
				<Link
					href="/dashboard"
					className="group flex size-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
				>
					<Package2 className="size-4 transition-all group-hover:scale-110" />
					<span className="sr-only">Qaree Admin</span>
				</Link>
				{items.map((el, index) => (
					<Tooltip key={el.name}>
						<TooltipTrigger
							asChild
							onClick={() => {
								setActiveIndex(index);
							}}
						>
							<Link
								href={`/dashboard/${el.href}`}
								className={cn(
									"flex size-9 items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-foreground md:size-8",
									index === activeIndex &&
										"bg-accent text-accent-foreground  hover:text-foreground ",
								)}
							>
								{el.icon}
								<span className="sr-only">{el.name}</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">{el.name}</TooltipContent>
					</Tooltip>
				))}
				{/* <Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="/dashboard"
							className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<Home className="size-5" />
							<span className="sr-only">Dashboard</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Dashboard</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="/dashboard/books"
							className="flex size-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<Book className="size-5" />
							<span className="sr-only">Books</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Books</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="#"
							className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<PencilRuler className="size-5" />
							<span className="sr-only">Updates</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Updates</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="/dashboard/users"
							className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<Users2 className="size-5" />
							<span className="sr-only">Users</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Users</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href="/dashboard/analytics"
							className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<LineChart className="size-5" />
							<span className="sr-only">Analytics</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Analytics</TooltipContent>
				</Tooltip> */}
			</nav>
			<nav className="mt-auto flex-center px-2 py-4">
				<Tooltip>
					<TooltipTrigger asChild>
						<ThemeToggle />
					</TooltipTrigger>
					<TooltipContent side="right">Theme toggle</TooltipContent>
				</Tooltip>
			</nav>
		</aside>
	);
}
