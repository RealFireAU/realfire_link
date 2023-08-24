import { json, redirect } from '@sveltejs/kit';

// read the json file at $lib/custom.json
import custom from '$lib/custom.json';

/** @type {import('$./types').RequestHandler}*/
export function GET( { url } ) {
    console.log(url.pathname);
    if (custom.hasOwnProperty(url.pathname.replace(/^\//, ''))) {
        const { href } = new URL(custom[url.pathname.replace(/^\//, '')]);
        throw redirect(301, href);
    }
    return json({ found: false });
}
