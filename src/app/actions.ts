"use server";

import type { ReviewSchema } from "@/components/AdminReviewForm";
import { fetcher } from "@/lib/graphql/fetcher";
import {
	reviewBookDataMutation,
	signUpMutation,
} from "@/lib/graphql/mutations";

import type { RegisterData } from "@/lib/graphql/types";
import { registerFormSchema } from "@/schema";

type ActionState = {
	success: boolean;
	message: string;
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
		return { success: true, message: reviewBookData.message ?? "Sucess" };
	} catch (error) {
		const message = getErrorMessage(error);
		return { success: false, message };
	}
};
