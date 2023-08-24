import { json } from '@sveltejs/kit';

/** @type {import('$./types').RequestHandler}*/
export async function POST( { request } ): Promise<Response> {
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

  return json( { url, slug } );
}

export async function DELETE() {
  return json( { error: 'not implemented' }, { status: 501 } );
}
