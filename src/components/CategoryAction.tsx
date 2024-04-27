"use client";

import type { Category } from "@/app/dashboard/categories/columns";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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

import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CategorySchema, categorySchema } from "@/schema";
import { toast } from "sonner";
import { useState } from "react";
import { FormInput } from "./SmartForm";
import { FormFile } from "./FormFile";
import { FormIcon } from "./FormIcon";

type PropsWithoutCategry = {
	type?: "create";
};

type PropsWithCategory = {
	type: "update";
	category: Category;
};

type Props = PropsWithCategory | PropsWithoutCategry;

export function CategoryAction(props: Props) {
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
		mode: "onSubmit",
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name_en: "",
			name_ar: "",
			background: "",
			icon: undefined,
		},
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
				<DialogContent className="sm:max-w-xl">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
							<DialogHeader>
								<DialogTitle>Add New Category</DialogTitle>
								<DialogDescription>
									Provide new category details or update existing ones. Ensure
									the 24px icon type and appropriate background colors for light
									and dark modes.
								</DialogDescription>
							</DialogHeader>
							<div className="space-y-5">
								<FormInput
									form={form}
									name="name_en"
									label="English Name"
									placeholder="Category English mame"
								/>
								<FormInput
									form={form}
									name="name_ar"
									label="Arabic Name"
									placeholder="Category Arabic mame"
								/>
								<div className="grid grid-cols-2 gap-4">
									<FormIcon
										form={form}
										name="icon"
										type="file"
										label="Shows Icon"
										className="h-20"
									/>
									<FormInput
										form={form}
										name="background"
										label="Background"
										type="color"
										className="h-20"
									/>
								</div>
							</div>

							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button type="submit">Submit</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
