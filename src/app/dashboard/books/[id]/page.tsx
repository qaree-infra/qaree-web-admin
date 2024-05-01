export const dynamic = "force-dynamic";

import AdminReviewForm from "@/components/AdminReviewForm";
import BookDetailes from "@/components/BookDetailes";
import ReviewHistory from "@/components/ReviewHistory";

type Props = {
	params: {
		id: string;
	};
};

export default function BookPage({ params: { id } }: Props) {
	// return <V0 />;

	return (
		<div>
			{/* <BookDetailes bookId={id} /> */}
			<AdminReviewForm bookId={id} />
			<ReviewHistory bookId={id} />
		</div>
	);
}
