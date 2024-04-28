"use server";

import type { CategorySchema, ReviewSchema, categorySchema } from "@/schema";

import { fetcher } from "@/lib/graphql/fetcher";
import {
	addCategoryMutation,
	reviewBookDataMutation,
	signUpMutation,
} from "@/lib/graphql/mutations";

import type { CategoryIcon, RegisterData } from "@/lib/graphql/types";
import { registerFormSchema } from "@/schema";
import type { ResultOf } from "gql.tada";
import { revalidatePath } from "next/cache";
import { UPLOAD_FULL_URL } from "@/lib/graphql";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

type ActionState = {
	success: boolean;
	message: string;
};

type StateWithData<T> = ActionState & {
	data: T | null;
};

const getErrorMessage = (error: unknown): string => {
	let message = "Unexpected Error";
	if (error instanceof Error) {
		message = error.message;
	}
	return message;
};

export const registerAction = async (
	userData: RegisterData,
): Promise<ActionState> => {
	const result = registerFormSchema.safeParse(userData);

	if (!result.success) {
		const errorMessage = result.error.message;
		return {
			success: false,
			message: errorMessage,
		};
	}

	try {
		const { register } = await fetcher({
			query: signUpMutation,
			variables: userData,
			cache: "default",
			server: true,
			protectid: false,
		});

		if (!register) {
			return {
				success: false,
				message: "Failed to sign up",
			};
		}

		return {
			success: true,
			message: "Register succesffuly",
		};
	} catch (error) {
		let errorMessage = "Unexpected Error!";

		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return {
			success: false,
			message: errorMessage,
		};
	}
};

export const reviewBookAction = async ({
	bookId,
	review,
}: {
	bookId: string;
	review: ReviewSchema;
}): Promise<ActionState> => {
	try {
		const { reviewBookData } = await fetcher({
			query: reviewBookDataMutation,
			variables: {
				bookId,
				...review,
			},
			server: true,
			protectid: true,
		});
		if (!reviewBookData?.success) {
			throw Error("Error: faield to save review");
		}
		revalidatePath("/dashboard/categories");
		return { success: true, message: reviewBookData.message ?? "Sucess" };
	} catch (error) {
		const message = getErrorMessage(error);
		return { success: false, message };
	}
};

export const addCategoryAction = async (variables: {
	name_en: string;
	name_ar: string;
	background: string;
}): Promise<StateWithData<ResultOf<typeof addCategoryMutation>>> => {
	try {
		const data = await fetcher({
			query: addCategoryMutation,
			variables,
			server: true,
		});

		if (!data.addCategory) {
			throw Error("Server Error");
		}

		return {
			success: true,
			message: "New category has been successfully added",
			data,
		};
	} catch (error) {
		const message = getErrorMessage(error);
		return {
			success: false,
			message,
			data: null,
		};
	}
};

export const uploadCategoryIcon = async (
	id: string,
	formData: FormData,
): Promise<StateWithData<CategoryIcon>> => {
	const session = await getServerSession(authOptions);

	try {
		if (!session?.user) {
			throw Error("You must be signed in to perform this action");
		}

		const token = session.user.access_token;

		const res = await fetch(UPLOAD_FULL_URL.icon(id), {
			method: "POST",
			headers: {
				accept: "application/json",
				contentType: "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		const data = (await res.json()) as CategoryIcon;

		return {
			success: true,
			message: "sucess",
			data,
		};
	} catch (error) {
		const message = getErrorMessage(error);

		return {
			success: false,
			message,
			data: null,
		};
	}
};
