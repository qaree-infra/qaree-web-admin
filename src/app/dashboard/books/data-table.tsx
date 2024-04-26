"use client";
import { ArrowDownUp, ListFilter } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	SortingState,
} from "@tanstack/react-table";

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { RouterPagination } from "@/components/table/RouterPagination";
import { DataTable } from "@/components/table/PureDataTable";

type PaginationConfig = {
	state: PaginationState;
	rowCount: number;
};

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	paginationConfig: PaginationConfig;
}

export function BooksDataTable<TData, TValue>({
	columns,
	data,
	paginationConfig,
}: DataTableProps<TData, TValue>) {
	const [columnVisibility, setColumnVisibility] = useState({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			columnVisibility,
			columnFilters,
			sorting,
			pagination: paginationConfig.state,
		},
		manualPagination: true,
		rowCount: paginationConfig.rowCount,
	});

	return (
		<Tabs defaultValue="all">
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value="active">Active</TabsTrigger>
					<TabsTrigger value="draft">Draft</TabsTrigger>
					<TabsTrigger value="archived" className="hidden sm:flex">
						Archived
					</TabsTrigger>
				</TabsList>
				<div className="ml-auto flex items-center gap-2">
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
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="h-7 gap-1">
								<ArrowDownUp className="size-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Sort
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<div>coming soon...</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<TabsContent value="all" className="py-4">
				<div className="rounded-md border">
					<DataTable table={table} />
				</div>
				<div className="py-4">
					<RouterPagination table={table} />
				</div>
			</TabsContent>
		</Tabs>
	);
}
