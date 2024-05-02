"use client";

import {
	Home,
	LineChart,
	Package,
	Package2,
	PanelLeft,
	ShoppingCart,
	Users2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { items } from "./Aside";

export function MobileSheet() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button size="icon" variant="outline" className="sm:hidden">
					<PanelLeft className="h-5 w-5" />
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="sm:max-w-xs">
				<nav className="grid gap-6 text-lg font-medium">
					<Link
						href="/dashboard"
						className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
						onClick={() => setOpen(false)}
					>
						<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
						<span className="sr-only">Acme Inc</span>
					</Link>
					{items.map((el) => (
						<Link
							key={el.name}
							href={`/dashboard/${el.href}`}
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							onClick={() => setOpen(false)}
						>
							{el.icon}
							{el.name}
						</Link>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
