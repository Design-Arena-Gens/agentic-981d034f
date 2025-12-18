# NexaForge Pro

NexaForge Pro is an AI-native website foundry that coordinates architect, copywriter, visual, and integration agents to deliver production-ready Next.js experiences. The platform combines OpenAI GPT-4o, DALL·E 3, Supabase, and Stripe into a cohesive build pipeline ready to deploy on Vercel.

## Stack

- Next.js 14 App Router • TypeScript • Tailwind CSS 4
- framer-motion + MagicUI-inspired motion system
- Supabase (Auth, Postgres, Edge Functions, Storage)
- Stripe subscriptions & checkout orchestration
- OpenAI GPT-4o + DALL·E 3 content and visual intelligence

## Local Development

```bash
npm install
npm run dev
```

The app runs at http://localhost:3000.

### Environment

Copy `.env.example` to `.env.local` and provide credentials:

```env
OPENAI_API_KEY=sk-...
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
STRIPE_SECRET_KEY=sk_live_...
```

All keys are optional during exploration; the app falls back to deterministic sample output when providers are missing.

## Forge API

`POST /api/forge`

```json
{
  "projectName": "Orbit Ledger",
  "industry": "FinTech",
  "theme": "Glassmorphism",
  "goals": "Launch a conversion-focused SaaS marketing site",
  "tone": "Confident and enterprise-grade",
  "features": ["Stripe billing", "Supabase auth"]
}
```

Response contains the multi-agent blueprint: sitemap, copy, SEO metadata, palette, and integration plan.

`POST /api/checkout` accepts `priceId`, `successUrl`, `cancelUrl` for creating Stripe Checkout sessions when credentials are configured.

## Deployment

Build and deploy with Vercel:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-981d034f
```

Verify release once DNS propagates:

```bash
curl https://agentic-981d034f.vercel.app
```

## License

© NexaForge Collective. All rights reserved.
