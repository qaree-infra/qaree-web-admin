import { env } from "@/env";

export const BACKEND_BASE_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const BACKEND_URL = `${BACKEND_BASE_URL}/graphql`;

export const UPLOAD_FULL_URL = {
	cover: (bookId: string) => `${BACKEND_BASE_URL}/upload/book/cover/${bookId}`,
	file: (bookId: string) => `${BACKEND_BASE_URL}/upload/book/file/${bookId}`,
	sample: (bookId: string) =>
		`${BACKEND_BASE_URL}/upload/book/sample/${bookId}`,
};
