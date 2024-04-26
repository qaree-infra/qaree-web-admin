"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { SortName } from "../books/SortName";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FormatedDate } from "@/components/table/FormatedDate";

export interface User {
	_id: string;
	name: string;
	email: string;
	avatar: {
		name: string;
		path: string;
	};
	createdAt: string;
}

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "name",
		enableHiding: false,
		header({ column }) {
			return <SortName column={column} title="Avatart & Name" />;
		},
		cell({ row }) {
			const { avatar, name } = row.original;

			return (
				<div className="flex items-center gap-4">
					<Avatar className="size-12">
						<AvatarImage
							src={avatar?.path || ""}
							alt={`@${name}`}
							className="size-12"
						/>
						<AvatarFallback>
							{name.length ? name[0]?.toUpperCase() : "Q"}
						</AvatarFallback>
					</Avatar>
					<div>{name}</div>
				</div>
			);
		},
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell({ row }) {
			return <FormatedDate value={+row.original.createdAt} />;
		},
	},
	{
		id: "actions",
		cell({ row }) {
			const { _id: bookId } = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<DotsHorizontalIcon className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(bookId)}
						>
							Copy ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href={`mailto:${row.original.email}`}>Contact</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Report</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
