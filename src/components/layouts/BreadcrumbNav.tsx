"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BreadcrumbNav() {
	const pathname = usePathname();

	const pathSegments = pathname.split("/").filter((item) => item !== "");

	return (
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>
				{pathSegments.map((item, index) => (
					<BreadcrumbItem key={item}>
						<BreadcrumbLink asChild>
							{index + 1 === pathSegments.length ? (
								<BreadcrumbPage>{item}</BreadcrumbPage>
							) : (
								<Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
									{item}
								</Link>
							)}
						</BreadcrumbLink>
						{index < pathSegments.length - 1 && <BreadcrumbSeparator />}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export default Breadcrumb;
