"use client";

import type { Category } from "@/app/dashboard/categories/columns";
import React from "react";

type PropsWithoutCategry = {
	type?: "create";
};

type PropsWithCategory = {
	type: "update";
	category: Category;
};

type Props = PropsWithCategory | PropsWithoutCategry;

export function CategoriesForm(props: Props) {
	if (props.type === "update") {
		// handel update
	}

	return <div>CategoriesForm</div>;
}
