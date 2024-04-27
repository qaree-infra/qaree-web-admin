"use client";

import type { Category } from "@/app/dashboard/categories/columns";
import { Button } from "./ui/button";

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
import { FormInput, SubmitButton } from "./SmartForm";
import { FormIcon } from "./FormIcon";
import { PencilRuler, Plus } from "lucide-react";
import { addCategoryAction } from "@/app/actions";
import { revalidatePath } from "next/cache";

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
		// FIXME: backend mutations missed category icon
		const formData = new FormData();
		formData.append("icon", values.icon);

		const { icon, ...rest } = values;

		const { success, message, data } = await addCategoryAction(rest);

		if (!success) {
			return toast.error(message);
		}

		toast.success(message);

		setOpen(false);
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
					{props.type === "update" ? (
						<Button size={"icon"} variant={"outline"}>
							<PencilRuler />
						</Button>
					) : (
						<Button variant="outline" className="flex gap-2 ">
							<Plus className="size-5" />
							<span>New Category</span>
						</Button>
					)}
				</DialogTrigger>
				<DialogContent className="sm:max-w-xl">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							autoComplete="off"
							className="space-y-5"
						>
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
								<SubmitButton className="w-32" />
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
