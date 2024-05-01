import { NoBooksFound } from "@/components/skeleton/NoBooksFound";
import { fetcher } from "@/lib/graphql/fetcher";
import { getBookSummaryQuery } from "@/lib/graphql/queries";
import { type BookSummary, columns } from "./columns";
import { BooksDataTable } from "./data-table";

import type { Metadata } from "next";
import { cache } from "react";

export const metadata: Metadata = {
	title: "Book Review",
};

type Props = {
	searchParams: {
		page: string;
		size: string;
	};
};

const getData = cache(
	async ({
		pageNumber,
		sizeNumber,
	}: { pageNumber: number; sizeNumber: number }) => {
		const { adminGetBooks } = await fetcher({
			query: getBookSummaryQuery,
			variables: {
				limit: sizeNumber,
				page: pageNumber,
			},
			server: true,
		});

		return adminGetBooks;
	},
);

async function BooksPage({ searchParams: { page = "1", size = "5" } }) {
	let pageNumber = Number.parseInt(page);
	const sizeNumber = Number(size);

	// Never trust user input
	if (Number.isNaN(pageNumber)) {
		pageNumber = 1;
	}

	const adminGetBooks = await getData({
		pageNumber,
		sizeNumber,
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
					pageSize: sizeNumber,
				},
			}}
		/>
	);
}

export default BooksPage;
