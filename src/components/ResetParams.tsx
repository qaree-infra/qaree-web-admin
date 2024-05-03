"use client";

import React from "react";
import { Button } from "./ui/button";
import { Cable } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ResetParams() {
	const pathname = usePathname();
	const router = useRouter();
	const params = useSearchParams();
	const hasParams = Array.from(params.values()).length > 0;

	return (
		<Button
			variant="outline"
			size="sm"
			className="h-7 gap-1"
			disabled={!hasParams}
			onClick={() => {
				router.push(pathname);
			}}
		>
			<Cable className="size-3.5 text-primary" />
			<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Reset</span>
		</Button>
	);
}
