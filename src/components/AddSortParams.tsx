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

type Status = {
	value: string;
	label: string;
};

const statuses: Status[] = [
	{
		value: "backlog",
		label: "Backlog",
	},
	{
		value: "todo",
		label: "Todo",
	},
	{
		value: "in progress",
		label: "In Progress",
	},
	{
		value: "done",
		label: "Done",
	},
	{
		value: "canceled",
		label: "Canceled",
	},
];

const TriggerButton = () => {
	return (
		<Button variant="outline" size="sm" className="h-7 gap-1">
			<ArrowDownUp className="size-3.5" />
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Sort</span>
		</Button>
	);
};

export type Options = { label: string; value: string }[];

interface Props {
	options: Options;
}

export function AddSortParams({ options }: Props) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
		null,
	);

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
					<StatusList
						setOpen={setOpen}
						setSelectedStatus={setSelectedStatus}
						options={options}
					/>
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
					<StatusList
						setOpen={setOpen}
						setSelectedStatus={setSelectedStatus}
						options={options}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function StatusList({
	setOpen,
	setSelectedStatus,
	options,
}: {
	setOpen: (open: boolean) => void;
	setSelectedStatus: (status: Status | null) => void;
	options: Options;
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
			<CommandInput placeholder="Filter status..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{options.map((status) => (
						<CommandItem
							key={status.value}
							value={status.value}
							onSelect={(value) => {
								router.push(`?${createQueryString("sort", value)}`);
								setOpen(false);
							}}
							className=" justify-between"
						>
							<span>{status.label}</span>
							{searchParams.get("sort") === status.value && (
								<Check className="size-5" />
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
