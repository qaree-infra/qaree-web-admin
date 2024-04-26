import React from "react";

export function NoBooksFound() {
	return (
		<div className="h-[calc(100vh-104px)] flex flex-col items-center justify-center">
			<div className="relative inline-block">
				<div className="absolute top-0 left-0 w-full h-full -rotate-2 skew-x-3 bg-[#f5f5f5] rounded-md shadow-md dark:bg-[#1a1a1a]" />
				<div className="relative z-10 px-8 py-6 bg-white rounded-md shadow-md dark:bg-[#222222]">
					<div className="flex flex-col items-center">
						<div className="relative inline-block">
							<div className="absolute top-0 left-0 w-full h-full -rotate-1 skew-x-2 bg-[#e0e0e0] rounded-md shadow-md dark:bg-[#333333]" />
							<div className="relative z-10 px-6 py-4 bg-white rounded-md shadow-md dark:bg-[#222222]">
								<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
									No books found
								</h2>
							</div>
						</div>
						<div className="mt-4 text-gray-600 dark:text-gray-400">
							<p>It seems there are no books matching your search.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
