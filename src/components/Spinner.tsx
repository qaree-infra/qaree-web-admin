import { cn } from "@/lib/utils";
import React from "react";
export const Spinner = ({ className }: { className?: string }) => {
	return (
		<div
			className={cn(
				"w-5 h-5 rounded-full border-r-2 border-t-2 border-t-primary-foreground border-r-transparent animate-spin duration-500",
				className,
			)}
		/>
	);
};
