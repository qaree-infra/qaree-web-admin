import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownLogoutItem,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getCurrentUser } from "@/lib/authOptions";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

async function UserNav() {
	const user = await getCurrentUser();

	if (!user) return;
	const { name, email, avatar } = user;

	// const { name, avatar, email } = {
	// 	name: "mohamed",
	// 	email: "",
	// 	avatar: {
	// 		size: 34234,
	// 		path: "kljsdf",
	// 	},
	// };

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={avatar?.path || ""} alt={`@${name}`} />
						<AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>

					<DropdownMenuItem>
						Account Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownLogoutItem />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default UserNav;
