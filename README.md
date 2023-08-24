# realfire_link

## Description

Realfire_link is a link shortener that allows you to create short links and share them with your friends. It is a simple and easy to use application. 

## Features

- Frontend to create short links
- Backend to create short links and store them in key-value database
- Redirect to original link when short link is clicked
- API to create short links
- API to get original link from short link (coming soon)
- Admin panel to manage short links (coming soon)
- Potentiall auth to add links
- Potentially adding custom meta properties to short links or proxying to original link (will require a v2 API endpoint)

## Tech Stack

**Client:** Sveltekit, TailwindCSS, DaisyUI

**Server:** Cloudflare Workers, Cloudflare KV

## Run Locally

Clone the project

```bash
  git clone https://github.com/RealFireAU/realfire_link.git
```

Go to the project directory

```bash
  cd realfire_link
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## API Reference

#### Create Short Link

```http
  POST /api/v1/link
```

Body:

```json
{
  "url": "https://www.google.com",
  "slug": "google"
}
``` 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url` | `string` | **Required**. Link to shorten |
| `slug` | `string` | **Optional**. Slug to use for short link |

#### Get Original Link

```http
  GET /api/v1/link/${slug}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `slug`      | `string` | **Required**. Slug of short link |

## Authors

- [@RealFireAU](https://www.github.com/RealFireAU)

## License

Currently not decided on a license. Please contact me if you would like to use this project.
I will most likely choose GPL v3.0 or MIT License.


## Acknowledgements

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Cloudflare KV](https://www.cloudflare.com/en-au/products/workers-kv/)
- [Sveltekit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
