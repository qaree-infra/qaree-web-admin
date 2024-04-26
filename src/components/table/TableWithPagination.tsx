import type { Table } from "@tanstack/react-table";
import { SimpleDataTable } from "./SimpleDataTable";
import { RouterPagination } from "./RouterPagination";

export function TableWithPagination<TData>({ table }: { table: Table<TData> }) {
	return (
		<div>
			<SimpleDataTable table={table} />
			<RouterPagination table={table} />
		</div>
	);
}
