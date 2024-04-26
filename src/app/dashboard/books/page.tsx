import { DataTable } from "./data-table";
import { getBookSummaryQuery } from "@/lib/graphql/queries";
import { fetcher } from "@/lib/graphql/fetcher";
import { columns, type BookSummary } from "./columns";
import type { PaginationState } from "@tanstack/react-table";
import { redirect } from "next/navigation";

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
		//TODO: handle this
		// return <DataTable columns={columns} data={[]} />;
		return;
	}

	const { currentPage, books, total } = adminGetBooks;
	// return JSON.stringify(books);

	return (
		<DataTable
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

// const data = [
// 	{
// 		_id: "661d14b8fc4a78d6224c3c43",
// 		cover: {
// 			size: 16393,
// 			path: "https://res.cloudinary.com/dgg86hhf3/image/upload/v1713181904/book/cover/pvawqgje3ig9vjhzc9nz.jpg",
// 		},
// 		name: "hello world",
// 		avgRate: 0,
// 		price: 0,
// 		author: {
// 			name: "mohamed",
// 			avatar: null,
// 		},
// 		status: "inReview",
// 		createdAt: 2342352342343,
// 		reviewer: null,
// 	},
// ];
