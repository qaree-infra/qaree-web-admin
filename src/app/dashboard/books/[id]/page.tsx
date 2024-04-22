import React from "react";

function BookPage({ params }: { params: { id: string } }) {
	return (
		<div>
			<h2 className="text-4xl">Review Book: {params.id}</h2>
		</div>
	);
}

export default BookPage;
