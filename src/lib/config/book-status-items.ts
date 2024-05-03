// This 'options' array is used in Zod enum. If the selected option is not one of these, an invalid option error message will be shown.

import { Options } from "@/components/AddSortParams";

// Use snake_case for adding new options.
export const options = [
	"in_review",
	"pending",
	"rejected",
	"accepted",
	"draft",
] as const;

// Generate book status items with labels corresponding to options
export const bookStatusItems = options.map((status, index) => ({
	label: status.charAt(0).toUpperCase() + status.slice(1).replace("_", " "),
	value: options[index],
}));

export enum booksFilterBy {
	in_review = "inReview",
	rejected = "rejected",
	published = "published",
}

export const booksSortByItems: Options = [
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
