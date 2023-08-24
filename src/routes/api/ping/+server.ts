// import { error } from '@sveltejs/kit';

/** @type {import('$./types').RequestHandler}*/
export function GET( { url } ) {
    console.log(url)
  return new Response('pong', { status: 200 })
}