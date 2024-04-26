import { fetcher } from "@/lib/graphql/fetcher";
import { getBookEPubMetadataQuery } from "@/lib/graphql/queries";

export async function BookDetailes({ bookId }: { bookId: string }) {
	const { getBookEPubMetadata } = await fetcher({
		query: getBookEPubMetadataQuery,
		variables: {
			bookId: bookId,
		},
		server: true,
		protectid: true,
	});

	return (
		<div className="max-w-prose text-wrap">
			{JSON.stringify(getBookEPubMetadata, null, 2)}
		</div>
	);
}

export default BookDetailes;
