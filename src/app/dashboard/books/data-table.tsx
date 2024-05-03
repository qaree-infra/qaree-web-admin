"use client";
import { ArrowDownUp } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

import { ColumnsFilter } from "@/components/table/ColumnsFilter";
import { TableWithPagination } from "@/components/table/TableWithPagination";
import { useCallback, useState } from "react";
import { booksFilterBy } from "@/lib/config/book-status-items";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const queryWithoutFilter = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("filter");
		return params.toString();
	};

	return (
		<Tabs
			defaultValue={searchParams.get("filter") || "all"}
			onValueChange={(value) => {
				if (value !== "all") {
					return router.push(`?${createQueryString("filter", value)}`);
				}

				router.replace(`${pathname}?${queryWithoutFilter()}`);
			}}
		>
			<div className="flex items-center">
				<TabsList>
					<TabsTrigger value="all">All</TabsTrigger>
					<TabsTrigger value={booksFilterBy.in_review}>Pending</TabsTrigger>
					<TabsTrigger value={booksFilterBy.published}>Published</TabsTrigger>
					<TabsTrigger
						value={booksFilterBy.rejected}
						className="hidden sm:flex"
					>
						Rejected
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
			<div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
				<TableWithPagination table={table} />
			</div>
		</Tabs>
	);
}
