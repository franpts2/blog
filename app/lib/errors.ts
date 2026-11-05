import { isRouteErrorResponse } from 'react-router';

export type ErrorCopy = {
	label: string;
	title: string;
	message: string;
};

/** One place for how route errors are described, used by meta and the boundary. */
export function getErrorCopy(error: unknown): ErrorCopy {
	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return {
				label: '404',
				title: 'This page went missing',
				message: 'The link may be old, or the essay moved.'
			};
		}

		return {
			label: String(error.status),
			title: 'Something went wrong',
			message: error.statusText || 'An unexpected error occurred.'
		};
	}

	return {
		label: 'Error',
		title: 'Something went wrong',
		message:
			import.meta.env.DEV && error instanceof Error
				? error.message
				: 'An unexpected error occurred.'
	};
}
