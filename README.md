# emailer-cf-worker

A [Cloudflare Worker](https://workers.cloudflare.com/) that manages DAO DAO's
email queue. This rate-limits emails to AWS SES according to the limits.

## Development

### Run locally

```sh
npm run dev
# OR
wrangler dev --local --persist
```

### Configuration

1. Copy `wrangler.toml.example` to `wrangler.toml`.

2. Setup queue and update bindings in `wrangler.toml`:

```sh
npx wrangler queues create emails
```

3. Configure secrets:

```sh
echo <VALUE> | npx wrangler secret put AWS_REGION
echo <VALUE> | npx wrangler secret put AWS_ACCESS_KEY_ID
echo <VALUE> | npx wrangler secret put AWS_SECRET_ACCESS_KEY
```

## Deploy

```sh
wrangler publish
# OR
npm run deploy
```
