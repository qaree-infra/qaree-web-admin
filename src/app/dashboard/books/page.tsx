import { NoBooksFound } from "@/components/skeleton/NoBooksFound";
import { fetcher } from "@/lib/graphql/fetcher";
import { getBookSummaryQuery } from "@/lib/graphql/queries";
import type { PaginationState } from "@tanstack/react-table";
import { redirect } from "next/navigation";
import { type BookSummary, columns } from "./columns";
import { BooksDataTable } from "./data-table";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Book Review",
};

type Props = {
	searchParams: {
		page: string;
		size: string;
	};
};

async function BooksPage({ searchParams: { page = "1", size = "5" } }) {
	let pageNumber = Number.parseInt(page);

	// Never trust user input
	if (Number.isNaN(pageNumber)) {
		pageNumber = 1;
	}

	const { adminGetBooks } = await fetcher({
		query: getBookSummaryQuery,
		variables: {
			limit: Number(size),
			page: pageNumber,
		},
		server: true,
	});

	if (!adminGetBooks?.books) {
		return <NoBooksFound />;
	}

	const { books, total } = adminGetBooks;

	return (
		<BooksDataTable
			columns={columns}
			data={books as BookSummary[]}
			paginationConfig={{
				rowCount: total ?? 0,
				state: {
					pageIndex: pageNumber - 1,
					pageSize: Number(size),
				},
			}}
		/>
	);
}

export default BooksPage;
