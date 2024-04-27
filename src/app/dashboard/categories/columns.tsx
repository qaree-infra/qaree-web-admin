"use client";

import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { FormatedDate } from "@/components/table/FormatedDate";

export interface Category {
	_id: string;
	name_en: string;
	name_ar: string;
	icon: {
		name: string;
		path: string;
	};
	background: string;
	updateAt: string;
	createdAt: string;
}

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: "icon",
		header: "Icon",
		cell({ row }) {
			const { name, path } = row.original.icon;

			return (
				<div className="flex items-center gap-4">
					<div className="flex items-center justify-center p-2 rounded-md bg-muted">
						{path ? (
							<Image
								src={path}
								alt={name}
								width={24}
								height={24}
								className="size-10"
							/>
						) : (
							<ImageIcon className="text-muted-foreground" />
						)}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "name_en",
		header: "English Name",
	},
	{
		accessorKey: "name_ar",
		header: "Arabic Name",
	},
	{
		accessorKey: "background",
		header: "Background",
		cell({ row }) {
			const value = row.original.background;

			return (
				<Badge
					style={{
						backgroundColor: value,
					}}
				>
					{value}
				</Badge>
			);
		},
	},
	{
		accessorKey: "updateAt",
		header: "Last Edited",
		cell({ row }) {
			const lastEdited = row.original.updateAt ?? row.original.createdAt;
			return <FormatedDate value={+lastEdited} />;
		},
	},
	{
		header: "Action",
		id: "actions",
		accessorKey: "actions",
		cell({ row }) {
			return <div>update & delete</div>;
		},
	},
];
