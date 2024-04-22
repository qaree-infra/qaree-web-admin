const CUSTOM_ERROR_NAME = "QareeError";

class CustomError extends Error {
	constructor(message: string) {
		super(message);
		this.name = CUSTOM_ERROR_NAME;
	}
}

class ConnectionError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ConnectionError";
	}
}

type ErrorType = "custom" | "connection";

/**
 * The error message is shown to the user as is.
 */
export const createCustomError = (
	message: string,
	type: ErrorType = "custom",
) => {
	if (type === "custom") {
		return new CustomError(message);
	}

	if (type === "connection") {
		return new ConnectionError(message);
	}

	throw new Error("Unknown error type");
};

export class FetcherError extends Error {
	/**
	 * Throw this when the fetch is ok but the API returned an error
	 */
	constructor(message: string) {
		super(message);
		this.name = "FetcherError";
	}
}

export function formatError(error: unknown) {
	const data = {
		env: process.env.NODE_ENV,
		message: "",
		isKnown: false,
	};
	if (typeof error === "string") {
		data.message = error;
	} else if (error instanceof FetcherError) {
		data.message = error.message;
		data.isKnown = true;
	} else if (error instanceof Error) {
		data.message = error.message;
	} else {
		data.message = "Unknown error";
	}

	return data;
}

export function getErrorMessage(error: unknown) {
	const { message, isKnown, env } = formatError(error);
	if (env === "production") {
		const __msg__ =
			"Unexpected error occurred, most likely the reason for this is a problem with the internet connection";

		return isKnown ? message : __msg__;
	}

	return isKnown ? message : `[DEV ONLY]: ${message}`;
}
