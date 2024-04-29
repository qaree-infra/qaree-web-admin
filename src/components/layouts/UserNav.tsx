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

import { getCurrentUser } from "@/lib/authOptions";
import { Button } from "../ui/button";
import { siteConfig } from "@/lib/config/site";

async function UserNav() {
	const user = await getCurrentUser();

	if (!user) return;
	const { name, avatar } = user;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="overflow-hidden rounded-full"
				>
					<Avatar className="size-8">
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
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>
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
