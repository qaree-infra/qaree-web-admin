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

import { useRouter } from "next/navigation";

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function RouterPagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	const router = useRouter();

	const page = table.getState().pagination.pageIndex + 1;
	const size = table.getState().pagination.pageSize;
	const count = table.getRowCount();

	const lastPage = Math.ceil(count / size);
	if (page > lastPage) {
		router.push(`?page=${lastPage}&size=${size}`);
	}

	return (
		<div className="flex items-center justify-between px-2">
			<div className="flex-1 text-sm text-muted-foreground">
				Totale books: {count}
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Rows per page</p>
					<Select
						value={`${size}`}
						onValueChange={(value) => {
							router.push(`?page=${page}&size=${value}`);
							// table.setPageSize(Number(value));
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
							router.push(`?page=1&size=${size}`);
							// table.setPageIndex(0)
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
							router.push(`?page=${page}&size=${size}`);
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
							router.push(`?page=${page + 1}&size=${size}`);
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
							router.push(`?page=${table.getPageCount()}&size=${size}`);
							// table.setPageIndex(table.getPageCount() - 1)
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
