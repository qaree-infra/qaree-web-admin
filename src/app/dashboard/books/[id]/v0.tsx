import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";

function V0() {
	return (
		<div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-24">
			<div className="space-y-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					<div className="col-span-1 md:col-span-2 lg:col-span-1">
						<img
							alt="Book Cover"
							className="w-full aspect-[6/9] rounded-lg object-cover"
							height="600"
							src="/placeholder.svg"
							width="400"
						/>
					</div>
					<div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-4">
						<h1 className="text-3xl font-bold">The Alchemist</h1>
						<div className="flex items-center space-x-2">
							<p className="text-gray-500">by</p>
							<p className="font-medium">Paulo Coelho</p>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Publisher:</p>
								<p>HarperOne</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Language:</p>
								<p>English</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Subject:</p>
								<p>Fiction, Inspirational</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Edition:</p>
								<p>1st</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Publishing Rights:</p>
								<p>Worldwide</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Average Rating:</p>
								<p>4.6</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Price:</p>
								<p>$12.99</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">ISBN:</p>
								<p>978-0-06-112416-1</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Created At:</p>
								<p>2023-04-01</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Updated At:</p>
								<p>2023-04-15</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Publishing Date:</p>
								<p>2021-03-01</p>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-gray-500">Previous Publishing Date:</p>
								<p>2018-09-01</p>
							</div>
						</div>
						<div className="space-y-2">
							<p className="text-gray-500">Description:</p>
							<p>
								The Alchemist is a novel by Brazilian author Paulo Coelho that
								follows a young shepherd in his journey to the Pyramids of Giza,
								where he believes he will find a treasure. The story is an
								inspirational tale about following your dreams and discovering
								your true self.
							</p>
						</div>
						<div className="mt-4">
							<Link
								className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
								href="#"
							>
								View Book Content
							</Link>
						</div>
					</div>
				</div>
				<div className="space-y-4">
					<h2 className="text-2xl font-bold">Review the Book</h2>
					<form className="space-y-4">
						<div>
							<Label htmlFor="status">Status</Label>
							<Select defaultValue="pending">
								<SelectTrigger>
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="approved">Approved</SelectItem>
									<SelectItem value="rejected">Rejected</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="content">Content</Label>
							<Textarea id="content" placeholder="Enter your review" />
						</div>
						<Button type="submit">Submit Review</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default V0;
