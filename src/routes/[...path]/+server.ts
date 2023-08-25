import { json, redirect } from '@sveltejs/kit';

/** @type {import('$./types').RequestHandler}*/
export async function GET( { params, platform } ) {
    const slug = params.path.replace(/\//g, '');
    const link = await platform?.env?.linkShortener.get(slug);
    let url;
  
    // parse url and check if it is valid and rewrite it to https if it is not
    try {
      url = new URL(link).href;
    } catch (e) {
      url = null;
    }

    if (!url) {
      return json( { error: 'not found' }, { status: 404 } );
    }

    throw redirect(302, url);
}
