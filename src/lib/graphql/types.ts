export type DeepNonNullable<T> = {
	[P in keyof T]: T[P] extends object | null | undefined
		? DeepNonNullable<T[P]>
		: T[P];
};

type ApiResponseSuccess<T> = {
	data: T;
};

type ApiErrorResponse = {
	errors: {
		message: string;
		locations: { line: number; column: number }[];
		path: string[];
	}[];
};

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiErrorResponse;

export type AuthUser = {
	name: string;
	email: string;
	access_token: string;
	avatar: {
		size: number;
		path: string;
	};
};

export type RegisterData = {
	name: string;
	email: string;
	password: string;
};

export type LoginData = {
	email: string;
	password: string;
};

export type PureBookDetailesSchemaType = {
	name: string;
	description: string;
	categories: string[];
	language: string;
	publishingRights: boolean;
};
