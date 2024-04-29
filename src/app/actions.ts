"use server";

import type {
	CategorySchema,
	CategorySchemaWithoutIcon,
	OfferSchema,
	ReviewSchema,
	UpdateAccountSchema,
	categorySchema,
} from "@/schema";

import { fetcher } from "@/lib/graphql/fetcher";
import {
	addCategoryMutation,
	addOfferMutation,
	deleteAccountMutation,
	deleteCategoryMutation,
	deleteOfferMutation,
	editCategoryMutation,
	editOfferMutation,
	reviewBookDataMutation,
	signUpMutation,
	updateAccountMutation,
} from "@/lib/graphql/mutations";

import { authOptions } from "@/lib/authOptions";
import { tags } from "@/lib/config/tags";
import { UPLOAD_FULL_URL } from "@/lib/graphql";
import type { CategoryIcon, RegisterData } from "@/lib/graphql/types";
import { registerSchema } from "@/schema";
import type { ResultOf } from "gql.tada";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { Fascinate_Inline } from "next/font/google";
import type { Category } from "./dashboard/categories/columns";
import { redirect } from "next/dist/server/api-utils";

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
	const result = registerSchema.safeParse(userData);

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
		// revalidatePath("/dashboard/categories");
		return { success: true, message: reviewBookData.message ?? "Sucess" };
	} catch (error) {
		const message = getErrorMessage(error);
		return { success: false, message };
	}
};

export const addCategoryAction = async (
	variables: CategorySchemaWithoutIcon,
): Promise<
	StateWithData<{
		id: string;
	}>
> => {
	try {
		const data = await fetcher({
			query: addCategoryMutation,
			variables,
			server: true,
		});

		revalidateTag(tags.categories);

		return {
			success: true,
			message: "New category has been successfully added",
			data: {
				id: String(data.addCategory?._id),
			},
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
): Promise<ActionState> => {
	const session = await getServerSession(authOptions);

	try {
		if (!session?.user) {
			throw Error("You must be signed in to perform this action");
		}

		const token = session.user.access_token;

		await fetch(UPLOAD_FULL_URL.icon(id), {
			method: "POST",
			headers: {
				accept: "application/json",
				contentType: "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		revalidateTag(tags.categories);

		return {
			success: true,
			message: "Your category icon has been successfully updated",
		};
	} catch (error) {
		const message = getErrorMessage(error);

		return {
			success: false,
			message,
		};
	}
};

export const editCategoryAction = async (
	id: string,
	values: CategorySchemaWithoutIcon,
): Promise<ActionState> => {
	try {
		await fetcher({
			query: editCategoryMutation,
			variables: {
				categoryId: id,
				...values,
			},
			server: true,
		});

		revalidateTag(tags.categories);

		return {
			success: true,
			message: "Your category has been updated with the latest changes",
		};
	} catch (error) {
		const message = getErrorMessage(error);
		return {
			success: false,
			message,
		};
	}
};

export const deleteCategoryAction = async (
	categoryId: string,
): Promise<ActionState> => {
	try {
		const { deleteCategory } = await fetcher({
			query: deleteCategoryMutation,
			variables: {
				categoryId,
			},
			server: true,
		});

		if (!deleteCategory?.success) {
			throw Error(deleteCategory?.message ?? "Delete failed!");
		}

		revalidateTag(tags.categories);

		return {
			success: true,
			message: "Your category has been deleted",
		};
	} catch (error) {
		const message = getErrorMessage(error);

		return {
			success: false,
			message,
		};
	}
};

export const addOfferAction = async (variables: {
	bookId: string;
	expireAt: string;
	percent: number;
}): Promise<ActionState> => {
	try {
		await fetcher({
			query: addOfferMutation,
			variables,
			server: true,
		});

		revalidateTag(tags.offers);

		return {
			success: true,
			message: "Your new offer has been added",
		};
	} catch (error) {
		const message = getErrorMessage(error);
		return {
			success: false,
			message,
		};
	}
};

export const editOfferAction = async (variables: {
	id: string;
	percent: number;
	expireAt: string;
}): Promise<ActionState> => {
	try {
		await fetcher({
			query: editOfferMutation,
			variables,
			server: true,
		});

		revalidateTag(tags.offers);

		return {
			success: true,
			message: "Your offer has been successfully edited",
		};
	} catch (error) {
		const message = getErrorMessage(error);
		return {
			success: false,
			message,
		};
	}
};

export const deleteOfferAction = async (id: string): Promise<ActionState> => {
	try {
		await fetcher({
			query: deleteOfferMutation,
			variables: {
				id,
			},
			server: true,
		});

		revalidateTag(tags.offers);

		return {
			success: true,
			message: "The offer has been successfully deleted",
		};
	} catch (error) {
		const message = getErrorMessage(error);
		return {
			success: false,
			message,
		};
	}
};

export const updateAccountAction = async (
	variables: UpdateAccountSchema,
): Promise<ActionState> => {
	try {
		await fetcher({
			query: updateAccountMutation,
			variables,
			server: true,
		});

		revalidateTag(tags.account);

		return {
			success: true,
			message: "Your account data has been updated",
		};
	} catch (error) {
		const message = getErrorMessage(error);
		return {
			success: false,
			message,
		};
	}
};

export const deleteAccountAction = async (): Promise<ActionState> => {
	try {
		const { deleteAccount } = await fetcher({
			query: deleteAccountMutation,
			server: true,
		});

		if (!deleteAccount?.success) {
			throw Error("Something went wrong!");
		}

		return {
			success: true,
			message: deleteAccount.message ?? "Your account has been deleted",
		};
	} catch (error) {
		const message = getErrorMessage(error);
		return {
			success: false,
			message,
		};
	}
};

export const uploadAdminAvatar = async (
	formData: FormData,
): Promise<ActionState> => {
	const session = await getServerSession(authOptions);

	try {
		if (!session?.user) {
			throw Error("You must be signed in to perform this action");
		}

		const token = session.user.access_token;

		await fetch(UPLOAD_FULL_URL.avatar, {
			method: "POST",
			headers: {
				accept: "application/json",
				contentType: "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		revalidateTag(tags.account);

		return {
			success: true,
			message: " Your avatar has been updated.",
		};
	} catch (error) {
		const message = getErrorMessage(error);

		return {
			success: false,
			message,
		};
	}
};
