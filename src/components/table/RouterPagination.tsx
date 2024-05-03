import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function RouterPagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	const page = table.getState().pagination.pageIndex + 1;
	const size = table.getState().pagination.pageSize;
	const count = table.getRowCount();

	const router = useRouter();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const lastPage = Math.ceil(count / size);
	if (page > lastPage) {
		router.push(`?${createQueryString("page", String(table.getPageCount()))}`);
	}

	return (
		<div className="flex items-center justify-between px-2">
			<div className="max-sm:hidden flex-1 text-sm text-muted-foreground">
				Totale: {count}
			</div>
			<div className="max-sm:w-full max-sm:justify-between flex items-center space-x-6 lg:space-x-8 ">
				<div className="flex items-center space-x-2 ">
					<p className="max-sm:hidden text-sm font-medium">Rows per page</p>
					<Select
						value={`${size}`}
						onValueChange={(value) => {
							router.push(`?${createQueryString("size", value)}`);
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={size} />
						</SelectTrigger>
						<SelectContent side="top">
							{[5, 10, 15, 30].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Page {page} of {table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => {
							router.push(`?${createQueryString("page", String(1))}`);
						}}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => {
							router.push(`?${createQueryString("page", String(page - 1))}`);
						}}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => {
							router.push(`?${createQueryString("page", String(page + 1))}`);
						}}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => {
							router.push(
								`?${createQueryString("page", String(table.getPageCount()))}`,
							);
						}}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
