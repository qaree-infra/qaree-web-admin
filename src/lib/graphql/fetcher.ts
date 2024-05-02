import { print } from "graphql";

import type { ResultOf, TadaDocumentNode, VariablesOf } from "gql.tada";
import { FetcherError, createCustomError } from "./errors";
import type { ApiResponse } from "./types";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BACKEND_URL } from ".";
import { authOptions } from "../authOptions";
import { tags } from "../config/tags";

/**
 * This function will return the data from the API,
 * throw either Error or FetcherError or undefined (when redirect)
 * we catch the error and show a toaster in the client
 * we catch the error and throw error if env === 'development'
 * if not 'development' & not client we do nothing
 * we have unhandled type error when redirect
 */

interface TypeOptions<T> {
	headers?: HeadersInit;
	query: T;
	variables?: VariablesOf<T>;
	server?: boolean;
	protectid?: boolean;
	tags?: string[];
}

export async function fetcher<
	T extends TadaDocumentNode<ResultOf<T>, VariablesOf<T>>,
>({
	headers,
	query,
	variables,
	server = false,
	protectid = true,
	// tags,
}: TypeOptions<T>): Promise<ResultOf<T>> {
	let res: Response;
	let processRedirect = false;

	const session = await getServerSession(authOptions);
	if (!session && protectid) {
		processRedirect = true;
		//@ts-ignore this will case type error when redirect
		return;
	}

	try {
		if (server) {
			res = await fetch(BACKEND_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					accept: "application/json",
					Authorization: `Bearer ${session?.user.access_token}`,
					...headers,
				},
				body: JSON.stringify({
					query: print(query),
					variables,
				}),
				next: {
					revalidate: 3600,
					tags: [tags.account, tags.categories, tags.books, tags.users],
				},
			});
		} else {
			res = await fetch("/api", {
				method: "POST",
				body: JSON.stringify({
					body: JSON.stringify({
						query: print(query),
						variables,
					}),
					protectid,
					...headers,
				}),
			});
		}
	} catch (error) {
		if (error instanceof SyntaxError) {
			throw createCustomError(
				"Error occurred while getting data from the server",
			);
		}

		if (error instanceof Error) {
			throw error;
		}

		throw Error(typeof error === "string" ? error : "Unknown error");
	}

	if (processRedirect) {
		redirect(authOptions.pages?.signIn || "/signin");
	}

	const resData = (await res.json()) as ApiResponse<NonNullable<ResultOf<T>>>;

	if ("errors" in resData) {
		throw new FetcherError(resData.errors[0].message);
	}

	return resData.data;
}
