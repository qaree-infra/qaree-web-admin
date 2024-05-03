import { NoBooksFound } from "@/components/skeleton/NoBooksFound";
import { fetcher } from "@/lib/graphql/fetcher";
import { getBookSummaryQuery } from "@/lib/graphql/queries";
import { type BookSummary, columns } from "./columns";
import { BooksDataTable } from "./data-table";

import { tags } from "@/lib/config/tags";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Book Review",
};

const getData = async ({
	pageNumber,
	sizeNumber,
	filter,
}: { pageNumber: number; sizeNumber: number; filter: string }) => {
	const { adminGetBooks } = await fetcher({
		query: getBookSummaryQuery,
		variables: {
			limit: sizeNumber,
			page: pageNumber,
			filterBy: filter,
			keyword: "",
			sortBy: "",
		},
		server: true,
		tags: [tags.books],
	});

	return adminGetBooks;
};

// filterBy: "inReview", "rejected", "published"
// keyword: search keyword
// sortBy: updatedAt (the date of the last modification), price, name, publishionDate (the date of approval for publishing)

async function BooksPage({
	searchParams: { page = "1", size = "5", filter = "" },
}) {
	let pageNumber = Number.parseInt(page);
	const sizeNumber = Number(size);

	// Never trust user input
	if (Number.isNaN(pageNumber)) {
		pageNumber = 1;
	}

	const adminGetBooks = await getData({
		pageNumber,
		sizeNumber,
		filter,
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
