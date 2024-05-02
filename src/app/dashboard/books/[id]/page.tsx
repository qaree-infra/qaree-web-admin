type Props = {
	params: {
		id: string;
	};
};

export default function BookPage({ params: { id } }: Props) {
	// return <V0 />;

	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 flex items-center text-muted-foreground justify-center">
			<div className="text-xl md:text-3xl xl:text-7xl">Comming Soon...</div>
		</div>
	);

	// return (
	// 	<div>
	// 		{/* <BookDetailes bookId={id} /> */}
	// 		<AdminReviewForm bookId={id} />
	// 		<ReviewHistory bookId={id} />
	// 	</div>
	// );
}
