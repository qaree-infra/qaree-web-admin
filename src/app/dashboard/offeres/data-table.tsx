import { CategoriesDataTable } from "../categories/data-table";

import type { DataTableProps } from "../categories/data-table";

// Reuses the CategoriesDataTable for offers with type safety
// This promotes code maintainability and avoids code duplication
export function OffersDataTable<TData, TValue>({
	columns,
	data,
	paginationConfig,
}: DataTableProps<TData, TValue>) {
	return (
		<CategoriesDataTable
			columns={columns}
			data={data}
			paginationConfig={paginationConfig}
		/>
	);
}
