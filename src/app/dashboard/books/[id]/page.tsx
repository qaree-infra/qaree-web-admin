import { tags } from "@/lib/config/tags";
import { fetcher } from "@/lib/graphql/fetcher";
import { getBookEPubMetadataQuery } from "@/lib/graphql/queries";
import { ResultOf } from "gql.tada";

type Props = {
	params: {
		id: string;
	};
};

type NonNullableBookMetadata = {
	ISBN: string;
	date: string;
	creatorFileAs: string;
	creator: string;
	description: string;
	subject: string;
	title: string;
	language: string;
	modified: string;
	specifiedFonts: string;
	cover: string;
	generator: string;
	publisher: string;
};

const getData = async (bookId: string) => {
	const { getBookEPubMetadata } = await fetcher({
		query: getBookEPubMetadataQuery,
		variables: {
			bookId: bookId,
		},
		server: true,
		tags: [tags.books],
	});
	return getBookEPubMetadata as NonNullableBookMetadata;
};

export default async function BookPage({ params: { id } }: Props) {
	const data = await getData(id);

	return (
		<div>
			<div className="h-96 bg-muted ">book info</div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);

	// return (
	// 	<div>
	// {/* <BookDetailes bookId={id} /> */}
	// 		<AdminReviewForm bookId={id} />
	// 		<ReviewHistory bookId={id} />
	// 	</div>
	// );
}
