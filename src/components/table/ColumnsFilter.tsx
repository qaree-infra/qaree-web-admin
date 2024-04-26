import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { Button } from "../ui/button";
import type { Table } from "@tanstack/react-table";

export function ColumnsFilter<TData>({ table }: { table: Table<TData> }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="h-7 gap-1">
					<ListFilter className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Columns
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
