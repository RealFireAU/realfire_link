import { json } from '@sveltejs/kit';

/** @type {import('$./types').RequestHandler}*/
export async function POST( { request, platform } ): Promise<Response> {
  const body = await request.json();
  let { url, slug } = body;

  // input validation
  if ( !url ) {
    return json( { error: 'url is required' }, { status: 400 } );
  }

  // parse url and check if it is valid and rewrite it to https if it is not
  try {
    url = new URL(url).href.replace(/^http:\/\//, 'https://').toLocaleLowerCase();
  } catch (e) {
    return json( { error: 'url is invalid' }, { status: 400 } );
  }

  // check slug and if not provided, generate one
  if (!slug || slug.length < 3) {
    let hash = await crypto.subtle.digest('sha-256', new TextEncoder().encode(url));
    slug = new Uint8Array(hash).slice(0, 3).reduce((acc, val) => acc + val.toString(16), '');
  }

  // check if slug is already in use
  const existing = await platform?.env?.linkShortener.get(`${slug}`);
  if (existing) {
    return json( { error: 'slug is already in use' }, { status: 400 } );
  }

  // save link
  await platform?.env?.linkShortener.put(slug, url);

  return json( { url, slug } );
}

export async function DELETE( { params, platform }) {
  const slug = params.path.replace(/\//g, '');
  await platform?.env?.linkShortener.delete(slug);
  return new Response(null, { status: 204 }); 
}

export async function GET( {request, platform, params} ) {
  const slug = params.path.replace(/\//g, '');
  const link = await platform?.env?.linkShortener.get(slug);

  // parse url and check if it is valid and rewrite it to https if it is not
  let url;
  try {
    url = new URL(link).href.replace(/^http:\/\//, 'https://').toLocaleLowerCase();
  } catch (e) {
    url = null;
  }

  if (!url) {
    return json( { error: 'not found' }, { status: 404 } );
  }

  return json( { url } );
}