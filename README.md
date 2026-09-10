# devops-api

A small TypeScript API used to practise an end-to-end CI/CD pipeline:
test -> build image -> scan -> push to GHCR -> deploy to kind -> smoke test.

## Local development

```bash
nvm use
npm ci
npm run dev        # http://localhost:3000/health
npm run ci         # lint + typecheck + test + build
```

## Endpoints

| Route       | Purpose                                  |
|-------------|------------------------------------------|
| `/health`   | Liveness/readiness probe                 |
| `/api/time` | Current time, pod hostname, app version  |
