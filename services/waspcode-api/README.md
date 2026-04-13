# WaspCode API

Render-ready backend for:

- anonymous WaspCode user provisioning
- starter credit balances
- promo redemption
- MiniMax proxying

## Endpoints

- `GET /health`
- `POST /api/auth/anonymous`
- `GET /api/credits/status`
- `POST /api/credits/redeem`
- `GET /v1/models`
- `POST /v1/chat/completions`

## Local Run

```bash
npm install
npm start
```

Copy `.env.example` to `.env` and fill in `MINIMAX_API_KEY`.

## Render

This repo includes a root [render.yaml](C:/Users/ronit/Downloads/IDE/continue/render.yaml) that creates:

- a Node web service for this API
- a Postgres database for persistent credits and promo usage

Render can deploy it with the default `onrender.com` URL. No custom domain is required to start.
