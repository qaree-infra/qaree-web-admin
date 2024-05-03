import type { Option } from "@/components/AddSortParams";

export const bookStatusList = ["published", "rejected"] as const;

export const bookStatusItems: Option[] = [
	{
		label: "Accepted",
		value: bookStatusList["0"],
	},
	{
		label: "Rejected",
		value: bookStatusList["1"],
	},
];

export enum booksFilterBy {
	in_review = "inReview",
	rejected = "rejected",
	published = "published",
}

export const booksSortByItems: Option[] = [
	{
		label: "Updated At",
		value: "updatedAt",
	},
	{
		label: "Price",
		value: "price",
	},
	{
		label: "Name",
		value: "name",
	},
	{
		label: "Publishion Date",
		value: "publishionDate",
	},
];
