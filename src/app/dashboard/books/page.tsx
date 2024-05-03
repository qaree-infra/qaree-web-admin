import { NoBooksFound } from "@/components/skeleton/NoBooksFound";
import { fetcher } from "@/lib/graphql/fetcher";
import { getBookSummaryQuery } from "@/lib/graphql/queries";
import { type BookSummary, columns } from "./columns";
import { BooksDataTable } from "./data-table";

import { tags } from "@/lib/config/tags";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Book Review",
};

const getData = async ({
	pageNumber,
	sizeNumber,
	filter,
	sort,
}: {
	pageNumber: number;
	sizeNumber: number;
	filter: string;
	sort: string;
}) => {
	const { adminGetBooks } = await fetcher({
		query: getBookSummaryQuery,
		variables: {
			limit: sizeNumber,
			page: pageNumber,
			filterBy: filter,
			keyword: "",
			sortBy: sort,
		},
		server: true,
		tags: [tags.books],
	});

	return adminGetBooks;
};

async function BooksPage({
	searchParams: { page = "1", size = "5", filter = "", sort = "" },
}) {
	let pageNumber = Number.parseInt(page);
	const sizeNumber = Number(size);

	if (Number.isNaN(pageNumber)) {
		pageNumber = 1;
	}

	const adminGetBooks = await getData({
		pageNumber,
		sizeNumber,
		filter,
		sort,
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
