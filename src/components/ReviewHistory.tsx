import React from "react";

const placeholder: {
	reviewer: string;
	status: string;
	content: string;
	id: string;
}[] = [
	{
		id: "review_one",
		reviewer: "Alice",
		status: "Approved",
		content: "Great work on this project!",
	},
	{
		id: "review_three",
		reviewer: "Bob",
		status: "Pending",
		content: "Could you please provide more details on section 2?",
	},
	{
		id: "review_two",
		reviewer: "Charlie",
		status: "Rejected",
		content: "This proposal needs significant revisions before approval.",
	},
];

function ReviewHistory({ bookId }: { bookId: string }) {
	return (
		<div className="py-6">
			<h2 className="text-xl sm:text-2xl font-semibold mb-2">
				Previous Admin Review
			</h2>
			<div className="max-md:divide-y max-md:space-y-2">
				{placeholder.map((el) => {
					return (
						<div
							key={el.id}
							className="grid  py-2 md:grid-cols-3 gap-2 md:gap-4"
						>
							<div>
								<p className="text-muted-foreground">Status:</p>
								<p>{el.status}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Message:</p>
								<p>{el.content}</p>
							</div>
							<div>
								<p className="text-muted-foreground">Reviewer:</p>
								<p>{el.reviewer}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ReviewHistory;
