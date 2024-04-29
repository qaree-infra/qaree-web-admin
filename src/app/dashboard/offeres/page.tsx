import { fetcher } from "@/lib/graphql/fetcher";
import { getAllOffersQuery } from "@/lib/graphql/queries";
import { OffersDataTable } from "./data-table";
import { type Offer, columns } from "./columns";
import { OfferAction } from "@/components/OfferAction";

const getData = async (page: number, limit: number) => {
	const { getAllOffers } = await fetcher({
		query: getAllOffersQuery,
		variables: {
			limit,
			page,
			sort: "",
		},
		server: true,
	});

	return {
		offers: getAllOffers?.offers ?? [],
		total: getAllOffers?.total ?? 0,
	};
};

interface Props {
	searchParams: {
		page: string;
		size: string;
	};
}

export default async function Offers({
	searchParams: { page = "1", size = "10" },
}: Props) {
	let pageNumber = Number(page);
	let sizeNumber = Number(size);
	if (Number.isNaN(pageNumber)) {
		pageNumber = 1;
	}
	if (Number.isNaN(sizeNumber)) {
		sizeNumber = 10;
	}

	const { offers, total } = await getData(pageNumber, sizeNumber);
	// const offers: Offer[] = [
	// 	{
	// 		_id: "q332",
	// 		book: {
	// 			_id: "3we",
	// 			name: "hello world",
	// 		},
	// 		createdAt: "2024-05-03T21:00:00.000Z",
	// 		expireAt: "2024-05-03T21:00:00.000Z",
	// 		percent: 32,
	// 		updatedAt: "2024-05-03T21:00:00.000Z",
	// 	},
	// ];

	return (
		<div>
			<OffersDataTable
				// @ts-ignore nullable values!
				columns={columns}
				data={offers}
				paginationConfig={{
					rowCount: total,
					state: {
						pageIndex: pageNumber - 1,
						pageSize: Number(size),
					},
				}}
			/>
		</div>
	);
}
