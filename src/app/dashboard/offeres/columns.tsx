"use client";

import { buttonVariants } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface Offer {
	_id: string;
	percent: number;
	expireAt: string;
	book: {
		_id: string;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
}

export const columns: ColumnDef<Offer>[] = [
	{
		accessorKey: "percent",
		header: "Percent",
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
	},
	{
		accessorKey: "updatedAt",
		header: "Last Edit",
	},
	{
		accessorKey: "expireAt",
		header: "Expire Date",
	},
	{
		accessorKey: "book",
		header: "Book",
		cell({ row }) {
			const book = row.original.book;
			return (
				<div>
					<Link
						className={buttonVariants({
							variant: "link",
						})}
						href={`/dashboard/books/${book._id}`}
					>
						@{book.name}
					</Link>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell(props) {
			return <div>edit & delete</div>;
		},
	},
];
