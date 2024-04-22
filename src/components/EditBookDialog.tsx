// import { type EditBookType, editBookSchema } from "@/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Pencil } from "lucide-react";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { Button } from "./ui/button";

// import { updateBookAction } from "@/app/actions";
// // import type { Book } from "@/app/dashboard/manage/columns";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { toast } from "sonner";
// import { FormInput, FormSelect, FormTextare, SubmitButton } from "./SmartForm";
// import { Form } from "./ui/form";

// const getDefaultValues = (book: Book): EditBookType => {
// 	const categoriesList = book.categories.map((el) => el._id);

// 	const {
// 		_id,
// 		categories,
// 		status,
// 		createdAt,
// 		updatedAt,
// 		avgRate,
// 		publishingRights,
// 		...rest
// 	} = book;

// 	const data: EditBookType = {
// 		categories: categoriesList,
// 		publishingRights: publishingRights ? "true" : "false",
// 		...rest,
// 	};
// 	return data;
// };

// export function EditBookDialog({ book }: { book: Book }) {
// 	const [open, setOpen] = React.useState(false);

// 	const defaultValues = getDefaultValues(book);
// 	const form = useForm<EditBookType>({
// 		mode: "onSubmit",
// 		resolver: zodResolver(editBookSchema),
// 		defaultValues,
// 	});

// 	const onSubmit = async (values: EditBookType) => {
// 		// check if the inputs are modified
// 		// if (!form.formState.isDirty) {
// 		// 	return toast.error("No updates were made!");
// 		// }

// 		const { success, message } = await updateBookAction(book._id, values);

// 		if (!success) {
// 			return toast.error(message);
// 		}
// 		setOpen(false);
// 		toast.success(message);
// 	};

// 	return (
// 		<Dialog open={open} onOpenChange={setOpen}>
// 			<DialogTrigger asChild>
// 				<Button size={"icon"} variant={"outline"}>
// 					<Pencil className="size-5" />
// 				</Button>
// 			</DialogTrigger>
// 			<DialogContent className="sm:max-w-xl">
// 				<Form {...form}>
// 					<form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
// 						<DialogHeader>
// 							<DialogTitle>Edit book details</DialogTitle>
// 							<DialogDescription>
// 								Make changes to your book here. Click save when you`re done.
// 							</DialogDescription>
// 						</DialogHeader>
// 						<div className="py-4 space-y-5">
// 							<FormInput form={form} name="name" label="Name" />
// 							<div className="flex flex-col gap-4">
// 								<FormSelect
// 									form={form}
// 									name="publishingRights"
// 									items={[
// 										{ label: "Yes", value: "true" },
// 										{ label: "No", value: "false" },
// 									]}
// 									label="Rights"
// 									showLabel
// 								/>

// 								<FormSelect
// 									form={form}
// 									name="language"
// 									items={[
// 										{ label: "English", value: "1" },
// 										{ label: "Arabic", value: "2" },
// 									]}
// 									label="Language"
// 									showLabel
// 								/>

// 								{/* <Suspense fallback={<Spinner />}>
// 									<SelectCategories defaultValues={defaultValues.categories} />
// 								</Suspense> */}
// 							</div>
// 							<FormInput
// 								form={form}
// 								name="isbn"
// 								label="ISBN"
// 								placeholder="Enter ISBN (e.g., 0-061-96436-0)"
// 							/>
// 							<div className="grid gap-5 sm:grid-cols-2">
// 								<FormInput
// 									form={form}
// 									name="edition"
// 									type="number"
// 									placeholder="Book edition"
// 									label="Edition"
// 								/>
// 								<FormInput
// 									form={form}
// 									name="price"
// 									type="number"
// 									placeholder="Enter price in US dollars"
// 									label="Price"
// 								/>
// 							</div>
// 							<FormTextare
// 								form={form}
// 								name="description"
// 								label="Description"
// 								placeholder="Write book description"
// 							/>
// 						</div>
// 						<DialogFooter>
// 							<SubmitButton>Update</SubmitButton>
// 						</DialogFooter>
// 					</form>
// 				</Form>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }
