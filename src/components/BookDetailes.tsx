import { fetcher } from "@/lib/graphql/fetcher";
import {
	getBookEPubManifestQuery,
	getBookEPubMetadataQuery,
} from "@/lib/graphql/queries";
import { Button } from "./ui/button";
import Link from "next/link";
import { getBinaryMetadata } from "next/dist/build/swc";

export async function BookDetailes({ bookId }: { bookId: string }) {
	// TODO: this all provided data by backend, see getAllBook endpoint for more

	const { getBookEPubMetadata } = await fetcher({
		query: getBookEPubMetadataQuery,
		variables: {
			bookId: bookId,
		},
		server: true,
		protectid: true,
	});

	return (
		<div>
			{/* <Link href={url}>Book Content</Link> */}
			<div className="max-w-prose text-wrap">
				{JSON.stringify(getBookEPubMetadata)}
			</div>
		</div>
	);
}

export default BookDetailes;

/**
 * const {ISBN, cover, creator, creatorFileAs, date,description,generator,language,modified,publisher,specifiedFonts, subject, title} = getBookEPubMetadata;
 */
