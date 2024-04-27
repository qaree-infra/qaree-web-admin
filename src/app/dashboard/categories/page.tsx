import { fetcher } from "@/lib/graphql/fetcher";
import { getAllCategoriesQuery } from "@/lib/graphql/queries";
import React from "react";
import CategoriesDataTable from "./data-table";
import { Category, columns } from "./columns";
import { NoBooksFound } from "@/components/skeleton/NoBooksFound";

const getData = async () => {
	const { getAllCategories } = await fetcher({
		query: getAllCategoriesQuery,
		variables: {
			limit: 10,
			page: 1,
			completed: true,
		},
		server: true,
	});

	return getAllCategories?.categories;
};

export default async function Categories() {
	const categories = await getData();

	if (!categories) {
		//TODO: update this to dynamic message support
		return <NoBooksFound />;
	}
	console.log(categories);

	return (
		<div>
			{/* @ts-ignore nullable values */}
			<CategoriesDataTable columns={columns} data={categories} />
		</div>
	);
}
