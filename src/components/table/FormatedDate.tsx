import React from "react";

export function FormatedDate({ value }: { value: number }) {
	const formatter = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	const formattedDate = formatter.format(new Date(value));

	return <div>{formattedDate}</div>;
}
