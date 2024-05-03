import AdminReviewForm from "@/components/AdminReviewForm";
import { Separator } from "@/components/ui/separator";
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
		<div className="space-y-6 pb-20">
			<div className=" bg-muted p-4">
				<h3 className="mb-2">Review This Data ^^</h3>
				<pre className="text-wrap ">{JSON.stringify(data, null, 2)}</pre>
			</div>
			<div>
				<h3 className="text-2xl ">Book Status</h3>
				<AdminReviewForm bookId={id} />
			</div>
		</div>
	);
}
