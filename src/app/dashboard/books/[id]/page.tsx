import BookDetailes from "@/components/BookDetailes";

type Props = {
	params: {
		id: string;
	};
};

export default function BookPage({ params: { id } }: Props) {
	return (
		<div>
			<BookDetailes bookId={id} />
		</div>
	);
}
