import { DataTable } from "./data-table";
import { getBookSummaryQuery } from "@/lib/graphql/queries";
import { fetcher } from "@/lib/graphql/fetcher";
import { columns, type BookSummary } from "./columns";

async function BooksPage() {
	const { adminGetBooks } = await fetcher({
		query: getBookSummaryQuery,
		variables: {
			// filterBy: "",
			// keyword: "",
			limit: 20,
			// page: 1,
			// sortBy: "",
		},
		server: true,
	});

	if (!adminGetBooks?.books) {
		return <DataTable columns={columns} data={[]} />;
	}

	const { currentPage, numberOfPages, books, total } = adminGetBooks;

	// as used here to ignore nullable values
	return <DataTable columns={columns} data={books as BookSummary[]} />;
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
