import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Plus } from "lucide-react";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getAllCategoriesQuery } from "@/lib/graphql/queries";

import { usePublishFormContext } from "@/context";
import { fetcher } from "@/lib/graphql/fetcher";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function SelectCategories({
	defaultValues,
}: { defaultValues?: string[] }) {
	const [options, setOptions] = useState<{ label: string; value: string }[]>(
		[],
	);
	// todo make it works with edit action
	const [loading, setLoading] = useState(false);
	const { publishState, setPublishState } = usePublishFormContext();

	if (defaultValues?.length) {
		setPublishState({
			...publishState,
			categories: defaultValues,
		});
	}

	const selectedValues = new Set(publishState.categories);

	useEffect(() => {
		const getCategoriesOptions = async () => {
			setLoading(true);

			try {
				const { getAllCategories } = await fetcher({
					query: getAllCategoriesQuery,
					server: false,
					protectid: false,
				});
				const categoriesOptions = getAllCategories?.categories?.map((el) => ({
					label: el?.name_en,
					value: `${el?._id}`,
				})) as {
					label: string;
					value: string;
				}[];

				setOptions(categoriesOptions);
			} catch (error) {
				if (error instanceof Error) {
					setLoading(false);
					return toast.error(error.message);
				}
				toast.error("Failed to get categories");
			}
			setLoading(false);
		};
		getCategoriesOptions();
	}, []);

	return (
		<Popover>
			<PopoverTrigger asChild className="justify-start">
				<Button variant="outline" className="bg-transparent text-sm">
					<Plus className="mr-2 h-4 w-4" />
					Categories
					{selectedValues?.size > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{selectedValues.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{selectedValues.size > 2 ? (
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{selectedValues.size} selected
									</Badge>
								) : (
									options
										.filter((option) => selectedValues.has(option.value))
										.map((option) => (
											<Badge
												variant="secondary"
												key={option.value}
												className="rounded-sm px-1 font-normal"
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={"Categories"} />
					<CommandList>
						<CommandEmpty>
							{loading ? "Loading..." : "No results found."}
						</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(option.value);

								return (
									<CommandItem
										key={option.label}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(option.value);
											} else {
												selectedValues.add(option.value);
											}
											const categories = Array.from(selectedValues);
											setPublishState({
												...publishState,
												categories,
											});
										}}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												isSelected
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible",
											)}
										>
											<Check className={cn("h-4 w-4")} />
										</div>
										{/* todo replace jsx icon with fetched path */}
										{/* {option.icon && (
											<option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
										)} */}
										<span>{option.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() =>
											setPublishState({
												...publishState,
												categories: [],
											})
										}
										className="justify-center text-center"
									>
										Clear
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
