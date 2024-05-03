"use client";

import { NoBooksFound } from "@/components/skeleton/NoBooksFound";
import React from "react";

function BookError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="h-[calc(100svh-6.25rem)] pb-[6.25rem] flex flex-col items-center justify-center">
			<div className="relative inline-block">
				<div className="absolute top-0 left-0 w-full h-full -rotate-2 skew-x-3 bg-[#f5f5f5] rounded-md shadow-md dark:bg-[#1a1a1a]" />
				<div className="relative z-10 px-8 py-6 bg-white rounded-md shadow-md dark:bg-[#222222]">
					<div className="flex flex-col items-center">
						<div className="relative inline-block">
							<div className="absolute top-0 left-0 w-full h-full -rotate-1 skew-x-2 bg-[#e0e0e0] rounded-md shadow-md dark:bg-[#333333]" />
							<div className="relative z-10 px-6 py-4 bg-white rounded-md shadow-md dark:bg-[#222222]">
								<h2 className="text-2xl font-bold text-destructive">
									{error.message}
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookError;
