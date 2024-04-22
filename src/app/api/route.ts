import { BACKEND_URL } from "@/lib/graphql";
import { type NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
	const reqBody = (await req.json()) as {
		method?: "POST";
		cache?: RequestCache;
		headers?: HeadersInit;
		body: BodyInit;
		protectid?: boolean;
		contentType?: "application/json" | "multipart/form-data";
	};

	const session = await getServerSession(authOptions);
	if (reqBody.protectid && !session) return;

	reqBody.contentType ??= "application/json";

	const res = await fetch(BACKEND_URL, {
		method: reqBody.method || "POST",
		headers: {
			"Content-Type": reqBody.contentType,
			accept: "application/json",
			Authorization: `Bearer ${session?.user.access_token}`,
		},
		body: reqBody.body,
		cache: reqBody.cache,
	});

	const returnedData = await res.json();

	return NextResponse.json(returnedData);
}
