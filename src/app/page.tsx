import Logo from "@/components/Logo";
import { buttonVariants } from "@/components/ui/button";
import { lusitana } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col p-6">
			<div className="flex h-20 shrink-0 items-end rounded-lg bg-muted p-4 md:h-52">
				<Logo />
			</div>
			<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
				<div className="flex flex-col justify-center gap-6 rounded-lg bg-muted px-6 py-10 md:w-2/5 md:px-20">
					<p
						className={cn(
							"text-xl md:text-3xl md:leading-normal",
							lusitana.className,
						)}
					>
						Unleash your inner author. Publish your book and find your readers
						with <strong>Qaree</strong>.
					</p>
					<Link
						href="/signin"
						className={buttonVariants({ className: "w-fit" })}
					>
						<span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
					</Link>
				</div>
				<div className="flex items-center justify-center  md:w-3/5 relative ">
					{/* todo: replace this image with happy author illusteration to fit in the dark mode */}
					<Image
						src={"/writer.avif"}
						width={626}
						height={417}
						alt="Author"
						className="h-full w-auto"
						priority
					/>
				</div>
			</div>
		</main>
	);
}
