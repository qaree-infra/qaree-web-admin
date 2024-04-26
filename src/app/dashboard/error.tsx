"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="container  min-h-screen py-40 flex-center">
			<div>
				<div className="mb-20 text-center">
					<p className="mb-4 text-lg font-semibold text-primary-sky">
						There was a problem
					</p>
					<h1 className="mb-10 max-w-prose text-balance text-2xl font-bold text-destructive capitalize sm:text-5xl ">
						{error.message || "Something went wrong"}
					</h1>
					<p className="opacity-80">
						Please check your internet connection or contact{" "}
						<a
							rel="noreferrer"
							href="mailto:ma0068664@gmail.com?subject=Qaree admin dashboard problem"
							target="_blank"
							className="underline hover:text-muted-foreground transition"
						>
							support
						</a>{" "}
						if the problem persistes.
					</p>
				</div>
				<div className="flex flex-wrap justify-center gap-5 sm:gap-16">
					<Button onClick={() => reset()}>Try again</Button>
					<Link
						href={"/dashboard"}
						className={buttonVariants({ variant: "outline" })}
					>
						Go back to home
					</Link>
				</div>
			</div>
		</div>
	);
}
