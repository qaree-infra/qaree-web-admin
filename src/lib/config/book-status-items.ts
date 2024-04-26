export const options = [
	"in_review",
	"pending",
	"rejected",
	"accepted",
	"draft",
] as const;

export const bookStatusItems: { label: string; value: string }[] = [
	{
		label: "In Review",
		value: options[0],
	},
	{
		label: "Pending",
		value: options[1],
	},
	{
		label: "Rejected",
		value: options[2],
	},
	{
		label: "Accepted",
		value: options[3],
	},
	{
		label: "Draft",
		value: options[4],
	},
];
