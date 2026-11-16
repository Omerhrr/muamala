#!/bin/sh
set -e

# Create / update the database tables (safe to run on every start; never drops data
# unless the schema change itself would, which Prisma refuses without a flag).
echo "[muamala] syncing database schema…"
node node_modules/prisma/build/index.js db push --skip-generate

# Seed the starter content only once, on first boot. After that the admin CMS owns the content.
if [ ! -f /data/.seeded ]; then
  echo "[muamala] first boot: seeding starter content…"
  bun run scripts/seed.ts
  touch /data/.seeded
fi

if [ -z "$ADMIN_SESSION_SECRET" ]; then
  echo "[muamala] WARNING: ADMIN_SESSION_SECRET is not set"
fi

exec "$@"
