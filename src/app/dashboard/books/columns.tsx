"use client";

import type { ColumnDef } from "@tanstack/react-table";

export interface BookSummary {
	_id: string;
	cover: File;
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
	publishionDate: string;
}

export const columns: ColumnDef<BookSummary>[] = [
	{
		accessorKey: "cover",
		header: "Cover",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "status",
		header: "Status",
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
	},
	{
		accessorKey: "publishionDate",
		header: "Publishion Date",
	},
];
