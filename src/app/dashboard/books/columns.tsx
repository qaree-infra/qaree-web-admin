"use client";

import { FormatedDate } from "@/components/table/FormatedDate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { ColumnDef } from "@tanstack/react-table";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SortName } from "./SortName";

export interface BookSummary {
	_id: string;
	cover: {
		path: string;
		size: number;
	};
	name: string;
	status: string;
	price: number;
	avgRate: number;
	reviewer: {
		name: string;
	};
	author: {
		name: string;
		avatar: string;
	};
	createdAt: string;
}

export const columns: ColumnDef<BookSummary>[] = [
	{
		accessorKey: "cover",
		header: "Cover",
		cell({ row }) {
			const data = row.original.cover;

			return (
				<div className="w-24 aspect-[6/9] bg-muted flex justify-center items-center m-2 max-md:hidden">
					{data ? (
						<Image
							src={data.path}
							className="w-full"
							width={60}
							height={90}
							alt={row.original.name}
						/>
					) : (
						<ImageIcon className="size-12 text-muted-foreground" />
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "name",
		enableHiding: false,
		header({ column }) {
			return <SortName column={column} title="Name" />;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		enableHiding: false,
		cell({ row }) {
			return <Badge>{row.original.status}</Badge>;
		},
	},
	{
		accessorKey: "price",
		header: "Price",
		cell({ row }) {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "EGP",
			}).format(row.original.price);
		},
	},
	{
		accessorKey: "avgRate",
		header: "Rate",
		cell({ row }) {
			const formatter = new Intl.NumberFormat("en-US", {
				minimumFractionDigits: 1,
				maximumFractionDigits: 2,
			});
			return <div>{formatter.format(row.original.avgRate)} Stars</div>;
		},
	},
	{
		accessorKey: "reviewer.name",
		header: "Reviewer",
		cell({ row }) {
			const reviewer = row.original.reviewer;
			if (!reviewer) {
				return <div className="ms-4">____</div>;
			}
			return <Badge variant={"outline"}>{reviewer.name}</Badge>;
		},
	},
	{
		accessorKey: "author.name",
		header: "Author",
		enableHiding: false,
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
		enableHiding: false,
		cell: ({ row }) => {
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
							<Link href={`/dashboard/books/${bookId}`}>Review</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
