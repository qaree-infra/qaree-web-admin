"use client";
import { ArrowDownUp } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type {
	ColumnDef,
	ColumnFiltersState,
	PaginationState,
	SortingState,
} from "@tanstack/react-table";

import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { ColumnsFilter } from "@/components/table/ColumnsFilter";
import { TableWithPagination } from "@/components/table/TableWithPagination";

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
					<ColumnsFilter table={table} />
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
			<TabsContent value="all">
				<TableWithPagination table={table} />
			</TabsContent>
		</Tabs>
	);
}
