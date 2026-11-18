# Deploying Muamala on the shared VPS (Docker)

Domain: **muamalamfbltd.com**. This VPS already runs a Caddy container
(`booklet-caddy-1`) on ports 80/443 with other apps, so Muamala plugs into it
instead of starting its own proxy. Nothing existing is touched except one new
block in Caddy's config.

## 1. DNS
A record: `muamalamfbltd.com` → the VPS public IP. Check with `nslookup muamalamfbltd.com`.

## 2. Upload the project
Put the folder at `/opt/muamala` (git, scp or rsync; skip `node_modules` and `.next`).

## 3. Find Caddy's network and config file
```bash
docker inspect booklet-caddy-1 --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{"\n"}}{{end}}'
docker inspect booklet-caddy-1 --format '{{range .Mounts}}{{.Source}} -> {{.Destination}}{{"\n"}}{{end}}'
```
- The first command prints the network name (likely `booklet_booklet`).
- The second shows which host file is mounted as `/etc/caddy/Caddyfile`.

## 4. Configure and start the app
```bash
cd /opt/muamala
cp production.env.example .env.production
nano .env.production        # ADMIN_SESSION_SECRET (openssl rand -hex 48), ADMIN_USERNAME, ADMIN_PASSWORD
echo "CADDY_NETWORK=booklet_booklet" > .env     # use the name from step 3
docker compose up -d --build
docker compose logs -f app                      # wait for "Ready"
```
No host ports are published, so there is no clash with 3000/3001/5174-5177/8000/9090 etc.

## 5. Add the site to Caddy
Append the block from `Caddyfile` in this folder to the host Caddyfile found in step 3, then:
```bash
docker exec booklet-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```
Caddy requests the HTTPS certificate automatically. Open https://muamalamfbltd.com
(admin: /admin). Check `docker logs booklet-caddy-1` if the certificate doesn't issue
(usually DNS not propagated yet).

## Day-to-day
| Task | Command |
|---|---|
| Update after code changes | `docker compose up -d --build` |
| Logs | `docker compose logs -f app` |
| Restart | `docker compose restart app` |
| Back up | `docker compose cp app:/data/muamala.db ./backup-$(date +%F).db` |
| Restore | `docker compose cp ./backup.db app:/data/muamala.db && docker compose restart app` |

All content, images, messages and applications are in one SQLite file in the
`muamala-data` volume. Back it up regularly.

## Changing the domain later
Change the hostname in the Caddy block, reload Caddy, point DNS at the VPS.
Titles, links and logo are editable in the admin.

## Notes
- Run one app container only (SQLite + in-memory login limiter).
- Starter content is seeded once on first boot; restarts never overwrite admin edits.
- The admin login from `.env.production` is only used when the database is new;
  change it later in the admin under "Account & password".
