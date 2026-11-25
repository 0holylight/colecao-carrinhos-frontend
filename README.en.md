<p align="right"><a href="README.md">🇧🇷 Português</a> · 🇺🇸 English</p>

# 🏎️ Car Collection — Front-end

Web interface for Car Collection, where miniature car collectors register and organize their collection, with a photo of each piece.

> ✅ **Status:** finished and deployed · [open the app](https://colecao-carrinhos.vercel.app) · consumes the API from the [back-end repository](https://github.com/0holylight/colecao-carrinhos)
>
> The app interface is in Portuguese.

> ⏳ The API runs on Render's free plan, which sleeps when idle: the first request can take up to about a minute to respond.

## Technologies

- **React 19** + **Vite**
- **React Router** for navigation, protected routes and guest-only routes
- **Redux Toolkit** for the session and the collection
- **Axios** to talk to the API
- **lucide-react** for icons
- **ESLint** for code consistency
- Deployed on **Vercel**

## Screens

| Route | Screen | Access |
|---|---|---|
| `/` | Home page | Public |
| `/login` | Login | Guests only |
| `/register` | Sign-up | Guests only |
| `/carros` | My collection | 🔒 Protected |

Creating, editing and deleting cars happens in modals inside the collection itself, without changing pages. Anyone already logged in who opens `/login` or `/register` is taken straight to the collection.

## Features

- Grid view of the collection with photo, name, color, year and release collection; cars without a photo get a default image
- Collection counter (up to 25 cars), with the add button locked once the limit is reached
- Welcome modal when the garage is empty
- A single form to create and edit, with photo upload (JPEG, PNG or GIF)
- Deletion with a confirmation modal
- Save and delete buttons locked while submitting, preventing double clicks
- Error messages from the API shown to the user
- Header that changes with the session, with a sign-out button, and a greeting on the home page for logged-in users
- Mobile-responsive layout

## Technical decisions

- **Session in an httpOnly cookie:** the JWT is set by the API in a cookie that browser JavaScript cannot read. That's why the front-end doesn't store the token in `localStorage`: Axios sends the cookie automatically with `withCredentials: true`
- **Session checked once, in `App`:** when the site opens, `App` asks the API who is logged in (`GET /usuarios/me`) and stores the answer in Redux. `ProtectedRoute` and `GuestRoute` only decide where to send the user after that answer arrives (`checked` flag), avoiding sending a logged-in user to the login page by mistake
- **Proxy on Vercel:** in production, calls go to `/api` and Vercel forwards them to Render (`vercel.json`). The front-end and the API share the same domain, so the cookie works with `sameSite: strict`. The same file routes all other paths to `index.html`, so refreshing the page at `/carros` doesn't return a 404
- **API address per environment:** `VITE_API_URL` points to `http://localhost:3001` in development and to `/api` in production (`.env.development` and `.env.production`)
- **Modals built with the native HTML `<dialog>` element**

## Running locally

> The [API](https://github.com/0holylight/colecao-carrinhos) needs to be running first, at `http://localhost:3001`.

```bash
# clone the repository
git clone https://github.com/0holylight/colecao-carrinhos-frontend.git
cd colecao-carrinhos-frontend

# install dependencies
npm install

# run in development mode
npm run dev
```

The application opens at `http://localhost:5173`. `.env.development` already points to the local API, so there is nothing to configure.

## Known issues

`npm audit` reports moderate vulnerabilities in **ESLint** dependencies, which is used only in development (it doesn't go into the build). The automatic fix would downgrade ESLint, so it was not forced.

## Next steps

- [ ] Profile screen (the API already has the routes)
- [ ] Filter the collection by release collection and year

## Author

**Guilherme Almeida** · [LinkedIn](https://www.linkedin.com/in/guilherme-almeida00/)
