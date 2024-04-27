"use client";

import type { Category } from "@/app/dashboard/categories/columns";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CategorySchema, categorySchema } from "@/schema";
import { toast } from "sonner";
import { useState } from "react";

type PropsWithoutCategry = {
	type?: "create";
};

type PropsWithCategory = {
	type: "update";
	category: Category;
};

type Props = PropsWithCategory | PropsWithoutCategry;

export function CategoriesForm(props: Props) {
	const [open, setOpen] = useState(false);

	if (props.type === "update") {
		// handel update
	}

	const onSubmit = async (values: CategorySchema) => {
		toast.info(
			<pre className="text-wrap text-start">
				{JSON.stringify(values, null, 2)}
			</pre>,
		);

		// set close if success
	};

	const form = useForm<CategorySchema>({
		mode: "onBlur",
		resolver: zodResolver(categorySchema),
	});

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">
						Add
						{/* shoudl be edit too */}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Add New Category</DialogTitle>
						<DialogDescription>
							Enter the details for the new category.
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="english-name">English Name</Label>
									<Input id="english-name" placeholder="English name" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="arabic-name">Arabic Name</Label>
									<Input id="arabic-name" placeholder="Arabic name" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="icon">Icon</Label>
									<Input id="icon" placeholder="Icon" type="file" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="background-color">Background Color</Label>
									<Input
										id="background-color"
										placeholder="Background color"
										type="color"
									/>
								</div>
							</div>
							<div className="flex flex-row-reverse gap-2">
								<Button type="submit">Submit</Button>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
							</div>
						</form>
					</Form>
					<DialogFooter>
						<Button type="submit">Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
