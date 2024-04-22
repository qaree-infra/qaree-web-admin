"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

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
			console.log(row.original);

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
		header: "Name",
		enableHiding: false,
	},
	{
		accessorKey: "status",
		header: "Status",
		enableHiding: false,
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "avgRate",
		header: "Rate",
	},
	{
		accessorKey: "reviewer.name",
		header: "Reviewer",
	},
	{
		accessorKey: "author.name",
		header: "Author",
		enableHiding: false,
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
	},
];
