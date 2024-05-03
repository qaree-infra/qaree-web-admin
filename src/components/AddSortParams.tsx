"use client";

import * as React from "react";

import { useMediaQuery } from "@/lib/hooks/use-media-query";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDownUp, Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { RadixIcons } from "./ui/ReduxIcons";

export type Option = {
	value: string;
	label: string;
};

interface Props {
	options: Option[];
}

export function AddSortParams({ options }: Props) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" size="sm" className="h-7 gap-1">
						<ArrowDownUp className="size-3.5" />

						<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
							Sort
						</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0" align="end">
					<StatusList setOpen={setOpen} options={options} />
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" size="sm" className="h-7 gap-1">
					<ArrowDownUp className="size-3.5" />

					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
						Sort
					</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">
					<StatusList setOpen={setOpen} options={options} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function StatusList({
	setOpen,
	options,
}: {
	setOpen: (open: boolean) => void;
	options: Option[];
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const queryWithoutSort = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("sort");
		return params.toString();
	};

	return (
		<Command>
			<CommandInput placeholder="Filter option..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{options.map((option) => (
						<CommandItem
							key={option.value}
							value={option.value}
							onSelect={(value) => {
								router.push(`?${createQueryString("sort", value)}`);
								setOpen(false);
							}}
							className=" justify-between"
						>
							<span>{option.label}</span>
							{searchParams.get("sort") === option.value && (
								<RadixIcons.check className="h-4 w-4" />
							)}
						</CommandItem>
					))}
				</CommandGroup>

				{searchParams.get("sort") && (
					<CommandGroup>
						<CommandSeparator />
						<CommandItem
							className="justify-center"
							onSelect={() => {
								router.replace(`${pathname}?${queryWithoutSort()}`);
								setOpen(false);
							}}
						>
							Clear
						</CommandItem>
					</CommandGroup>
				)}
			</CommandList>
		</Command>
	);
}
