import { lusitana } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";

function Logo() {
	return (
		<div className="flex gap-2 items-end">
			<Icons.logo className="h-12 w-12 rotate-[15deg]" />
			<div className={cn("text-4xl font-semibold", lusitana.className)}>
				Qaree
			</div>
		</div>
	);
}

export default Logo;
