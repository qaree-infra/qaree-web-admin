"use client";

import { OfferAction } from "@/components/OfferAction";
import { FormatedDate } from "@/components/table/FormatedDate";
import { Badge } from "@/components/ui/badge";
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
		cell({ row }) {
			const formatedPercent = new Intl.NumberFormat("en-US", {
				style: "percent",
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(row.original.percent);

			return <Badge>{formatedPercent}</Badge>;
		},
	},
	{
		accessorKey: "createdAt",
		header: "Created At",
		cell({ row }) {
			const date: number = +row.original.createdAt;
			return <FormatedDate value={date} />;
		},
	},
	{
		accessorKey: "updatedAt",
		header: "Last Edit",
		cell({ row }) {
			const date: number = +row.original.updatedAt;
			return <FormatedDate value={date} />;
		},
	},
	{
		accessorKey: "expireAt",
		header: "Expire Date",
		cell({ row }) {
			const date: number = +row.original.expireAt;
			return <FormatedDate value={date} />;
		},
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
						@ {book.name}
					</Link>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell({ row }) {
			return (
				<div>
					<OfferAction type="update" offer={row.original} />
				</div>
			);
		},
	},
];
