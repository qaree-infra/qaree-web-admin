import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
	DropdownLogoutItem,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { siteConfig } from "@/lib/config/site";
import { getAdminInfoQuery } from "@/lib/graphql/queries";
import type { AdminInfo } from "@/app/dashboard/account/page";
import { fetcher } from "@/lib/graphql/fetcher";
import { tags } from "@/lib/config/tags";

async function UserNav() {
	const { getAdminInfo } = (await fetcher({
		query: getAdminInfoQuery,
		server: true,
		tags: [tags.user],
	})) as { getAdminInfo: AdminInfo };

	const { avatar, name } = getAdminInfo;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="overflow-hidden rounded-full"
				>
					<Avatar className="size-9">
						<AvatarImage
							src={avatar?.path || ""}
							alt={`@${name}`}
							className="size-9"
						/>
						<AvatarFallback>
							{name.length ? name[0]?.toUpperCase() : "Q"}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href={"/dashboard/account"}>Settings</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={siteConfig.links.whatsapp} target="_blnak">
						Support
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownLogoutItem />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserNav;
