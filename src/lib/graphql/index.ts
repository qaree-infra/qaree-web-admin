import { env } from "@/env";

export const BACKEND_BASE_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const BACKEND_URL = `${BACKEND_BASE_URL}/graphql`;

export const UPLOAD_FULL_URL = {
	avatar: `${BACKEND_BASE_URL}/upload/admin/avatar`,
	icon: (id: string) => `${BACKEND_BASE_URL}/upload/category/icon/${id}`,
};
