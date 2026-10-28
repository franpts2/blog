import { redirect } from 'react-router';

/** The archive now lives at the site root. Keep old links working. */
export function loader() {
	return redirect('/');
}
