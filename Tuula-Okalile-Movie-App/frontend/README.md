# Tuula Okalile — Moviebox

A responsive movie and TV discovery app with search, details, genre browsing, and a saved watchlist. The project is split into separate `frontend` and `backend` folders for straightforward deployment.

## Features
- Trending, popular, action movies and popular TV shows
- Browse movies and TV shows, search by title, and view details
- Add/remove titles from a watchlist saved in browser localStorage
- Responsive dark interface
- Express backend keeps the TMDB access token off the frontend

## Requirements
- Node.js 18 or newer
- A free TMDB account and API Read Access Token from TMDB settings

## Run locally
### 1. Start backend
```bash
cd backend
npm install
````
Copy `.env.example` to `.env` and put either your TMDB API Read Access Token or API Key in `TMDB_TOKEN`. The backend accepts both credential types. Then run:
```bash
npm run dev
```
Backend runs at `http://localhost:5000`.

### 2. Start frontend in a second terminal
```bash
cd frontend
npm install
```
Copy `.env.example` to `.env` (default API URL is `http://localhost:5000`), then run:
```bash
npm run dev
```
Open the local URL Vite prints, usually `http://localhost:5173`.

## Deploy
### Backend on Render
1. Push the project to GitHub.
2. Create a **Web Service** on Render and set its Root Directory to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variable `TMDB_TOKEN` with your real TMDB API Read Access Token.
6. Add `FRONTEND_URL` with your deployed frontend URL (for example your Vercel URL).

### Frontend on Vercel
1. Import the same repository into Vercel and set Root Directory to `frontend`.
2. Add `VITE_API_URL` with your Render backend URL, without a trailing slash.
3. Deploy.

Never put the real `TMDB_TOKEN` in the frontend or commit a `.env` file. `.env.example` files contain placeholders only.

## Folder structure
```text
Tuula-Okalile-Movie-App/
  frontend/       React + Vite application
    src/          components, pages, hooks, context
    .env.example
  backend/
    src/server.js Express API proxy
    .env.example
    package.json
```

This product uses the TMDB API but is not endorsed or certified by TMDB.
