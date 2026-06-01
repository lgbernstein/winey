# Winey

Winey is a kiosk-first blind tasting app for a single party event. Hosts check in incoming bottles and assign numbered sleeves; guests rate each blind bottle with stars and a grape guess; the TV view shows a blind live leaderboard until the host starts the reveal.

## Run locally

Requirements: Node.js 24 or newer.

1. Copy `.env.example` to `.env` or set `HOST_PIN`, `PORT`, and `DATA_DIR` in the shell.
2. Install packages with `npm install`.
3. Build browser assets with `npm run build`.
4. Start the app with `npm start`.
5. Open the app in a browser. Use `?view=tv` on the TV display.

The default host PIN is `2468` for local setup only. Set a fresh `HOST_PIN` before a real party. SQLite data and uploaded images live under `DATA_DIR`, which defaults to `./data`.

Set `ANTHROPIC_API_KEY_WINEY` to enable label-photo check-in. The scanner also accepts `ANTHROPIC_API_KEY` as a fallback. For this local setup, `npm start` loads `/Users/larrybernstein/.env.keys` when that file exists. `ANTHROPIC_MODEL` defaults to `claude-haiku-4-5-20251001` and can be changed for another Anthropic vision-capable model available to the key.

## Party flow

- Open **Host** and take each arriving bottle label photo. The label scan assigns the next sleeve number and fills bottle details it can read; use **Edit** for corrections or manual check-in if needed.
- Open **Taste** on the iPad kiosk or guest phones. The required entry is name, sleeve, star rating, and grape guess.
- Open **Album** for shared event photo uploads and browsing.
- Put **TV** on the large screen. It refreshes the blind leaderboard and reveals bottle details only after the host selects **Grand reveal**.

Optional tasting details preserve the appearance, nose, and palate categories from the tasting grid without slowing the core guest flow.

## Deploy on a small server

The included `Dockerfile` stores the database and uploads in `/app/data`. On a small Hetzner VM or similar host:

1. Install Docker and place this project on the server.
2. Set a strong `HOST_PIN` and keep the app data volume backed up.
3. Build and run the container with the example Compose file in `deploy/compose.yml`.
4. Put HTTPS in front of port `3000` with a reverse proxy such as Caddy or Nginx.

Party photos and bottle photos are local app files for v1. Move `DATA_DIR` to durable storage or back up the Docker volume before and after the event.

## API map

- Public: `/api/bootstrap`, `/api/guests`, `/api/tastings`, `/api/leaderboard`, `/api/photos`, `/api/reveal`
- Host PIN session: `/api/host/session`
- Host-only: `/api/host/dashboard`, `/api/host/bottles`, `/api/host/bottles/:id`, `/api/host/state`

Run `npm test` to verify host gating, blind/reveal boundaries, tasting aggregation, and photo persistence.
