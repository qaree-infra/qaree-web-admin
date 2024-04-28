import type { Table } from "@tanstack/react-table";
import { RouterPagination } from "./RouterPagination";
import { SimpleDataTable } from "./SimpleDataTable";

export function TableWithPagination<TData>({ table }: { table: Table<TData> }) {
	return (
		<div>
			<SimpleDataTable table={table} />
			<RouterPagination table={table} />
		</div>
	);
}
