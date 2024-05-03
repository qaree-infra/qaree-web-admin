"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";

export function BreadcrumbNav() {
	const pathname = usePathname();

	const pathSegments = pathname.split("/").filter((item) => item !== "");

	return (
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				{pathSegments.map((item, index) => (
					<>
						<BreadcrumbItem key={item}>
							{index + 1 === pathSegments.length ? (
								pathSegments[index - 1] === "books" ? (
									<BreadcrumbPage>{"Review"}</BreadcrumbPage>
								) : (
									<BreadcrumbPage>{item}</BreadcrumbPage>
								)
							) : (
								<BreadcrumbLink asChild>
									<Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
										{item}
									</Link>
								</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < pathSegments.length - 1 && <BreadcrumbSeparator />}
					</>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export default Breadcrumb;
