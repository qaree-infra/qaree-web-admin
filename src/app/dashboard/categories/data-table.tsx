"use client";

import { TableWithPagination } from "@/components/table/TableWithPagination";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";

import {
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";

export type PaginationConfig = {
	state: PaginationState;
	rowCount: number;
};

export interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	paginationConfig: PaginationConfig;
}

export function CategoriesDataTable<TData, TValue>({
	columns,
	data,
	paginationConfig,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			pagination: paginationConfig.state,
		},
		manualPagination: true,
		rowCount: paginationConfig.rowCount,
	});

	return <TableWithPagination table={table} />;
}
