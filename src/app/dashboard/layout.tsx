import Header from "@/components/layouts/Header";
import SideNav from "@/components/layouts/SideNav";
import type { ReactNode } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Publish Service",
};

function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="h-svh flex">
			<SideNav />

			<div className="flex-1 flex flex-col">
				<Header />
				<div className="flex-1 flex overflow-hidden">
					<ScrollArea className="flex-1">{children}</ScrollArea>
				</div>
			</div>
		</div>
	);
}

export default Layout;
