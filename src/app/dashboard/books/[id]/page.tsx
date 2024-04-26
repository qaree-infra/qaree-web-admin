import AdminReviewForm from "@/components/AdminReviewForm";
import BookDetailes from "@/components/BookDetailes";
import ReviewHistory from "@/components/ReviewHistory";
import ErrorPage from "next/error";

type Props = {
	params: {
		id: string;
	};
};

export default function BookPage({ params: { id } }: Props) {
	return (
		<div>
			<BookDetailes bookId={id} />
			<AdminReviewForm bookId={id} />
			<ReviewHistory bookId={id} />
		</div>
	);
}
