export function generateStaticParams() {
	// fetch book data here
	return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
export default function BookPage({ params }: { params: { id: string } }) {
	return (
		<div>
			<h2 className="text-4xl">Review Book: {params.id}</h2>
		</div>
	);
}
