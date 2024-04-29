import { fetcher } from "@/lib/graphql/fetcher";
import { getAllOffersQuery } from "@/lib/graphql/queries";
import { OffersDataTable } from "./data-table";
import { columns } from "./columns";

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
