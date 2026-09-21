# COLLECTIVERSE — Domain Strategy

## Domains Owned

| Domain | Purpose |
|--------|---------|
| `collectiverse.studio` | Production — main platform |
| `collectiverse.dev` | QA / Staging environment |
| `collectiverse.live` | iOS App Store listing for Live app |
| `collectiverse.events` | iOS App Store listing for Events app |
| `collectiverse.blog` | iOS App Store listing for Blog/Community app |

---

## Web URLs (Browser / Desktop / Android)

| Environment | URL | What |
|-------------|-----|------|
| **Production** | `collectiverse.studio` | Main platform (web app) |
| **QA/Staging** | `collectiverse.dev` | Testing environment (mirrors production) |
| **Live** | `live.collectiverse.studio` | Live streaming / auctions / breaks |
| **Events** | `events.collectiverse.studio` | Convention calendar / meetups / check-in |
| **Blog** | `blog.collectiverse.studio` | Community blog / articles (in Community section) |

---

## iOS App Store URLs (Apple requires unique domains per app)

| App | App Store Domain | Web Fallback | Bundle ID |
|-----|-----------------|--------------|-----------|
| **Collectiverse** (main) | `collectiverse.studio` | `collectiverse.studio` | `studio.collectiverse.app` |
| **Collectiverse Live** | `collectiverse.live` | `live.collectiverse.studio` | `studio.collectiverse.live` |
| **Collectiverse Events** | `collectiverse.events` | `events.collectiverse.studio` | `studio.collectiverse.events` |
| **Collectiverse Blog** | `collectiverse.blog` | `blog.collectiverse.studio` | `studio.collectiverse.blog` |

---

## DNS Configuration

### collectiverse.studio (Production)
```
A     @                → CloudFront distribution
CNAME www              → CloudFront distribution
CNAME live             → CloudFront distribution (Live app)
CNAME events           → CloudFront distribution (Events app)
CNAME blog             → CloudFront distribution (Blog app)
```

### collectiverse.dev (Staging)
```
A     @                → Staging CloudFront/ALB
CNAME www              → Staging CloudFront/ALB
```

### collectiverse.live (iOS redirect)
```
A     @                → Redirect to live.collectiverse.studio
CNAME www              → Redirect to live.collectiverse.studio
```

### collectiverse.events (iOS redirect)
```
A     @                → Redirect to events.collectiverse.studio
CNAME www              → Redirect to events.collectiverse.studio
```

### collectiverse.blog (iOS redirect)
```
A     @                → Redirect to blog.collectiverse.studio
CNAME www              → Redirect to blog.collectiverse.studio
```

---

## Routing Logic

All apps share the SAME backend (same ECS cluster, same database). The subdomain determines which UI/layout renders:

```
Request → CloudFront → ALB → ECS (Next.js)
                                ↓
                    Check Host header:
                    - collectiverse.studio    → main app layout
                    - live.collectiverse.studio → live app layout  
                    - events.collectiverse.studio → events app layout
                    - blog.collectiverse.studio → blog layout
                    - collectiverse.dev       → staging (full app)
```

In Next.js middleware:
```typescript
const host = request.headers.get('host');
if (host?.startsWith('live.')) {
  // Serve Live app routes only
} else if (host?.startsWith('events.')) {
  // Serve Events app routes only
} else if (host?.startsWith('blog.')) {
  // Serve Blog routes only
}
```

---

## SSL Certificates (ACM)

| Certificate | Covers |
|-------------|--------|
| Cert 1 | `collectiverse.studio`, `*.collectiverse.studio` |
| Cert 2 | `collectiverse.dev`, `*.collectiverse.dev` |
| Cert 3 | `collectiverse.live` |
| Cert 4 | `collectiverse.events` |
| Cert 5 | `collectiverse.blog` |

All free via AWS Certificate Manager.

---

## GitHub Actions Deploy Targets

| Branch | Deploys To | Domain |
|--------|-----------|--------|
| `develop` | Staging | `collectiverse.dev` |
| `main` | Production | `collectiverse.studio` + subdomains |

---

## Domains to Purchase/Register

- [x] `collectiverse.studio` — already owned
- [ ] `collectiverse.dev` — register for staging
- [ ] `collectiverse.live` — register for Live iOS app
- [ ] `collectiverse.events` — register for Events iOS app
- [ ] `collectiverse.blog` — register for Blog iOS app

*Note: `.dev` domains require HTTPS (HSTS preloaded). `.live`, `.events`, `.blog` are standard gTLDs available from any registrar.*
