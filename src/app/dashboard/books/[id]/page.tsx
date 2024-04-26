import AdminReviewForm from "@/components/AdminReviewForm";
import BookDetailes from "@/components/BookDetailes";
import ReviewHistory from "@/components/ReviewHistory";
import ErrorPage from "next/error";
import V0 from "./v0";

type Props = {
	params: {
		id: string;
	};
};

export default function BookPage({ params: { id } }: Props) {
	// return <V0 />;

	return (
		<div>
			<BookDetailes bookId={id} />
			<AdminReviewForm bookId={id} />
			<ReviewHistory bookId={id} />
		</div>
	);
}
