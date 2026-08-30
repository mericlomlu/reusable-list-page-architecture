---
name: mock-route-handler
description: Creates or reviews a typed Next.js Route Handler that serves fictional list data for the architecture showcase. Use for `/api/components`, `/api/issues`, `/api/deployments`, or `/api/packages`.
---

# Mock Route Handler

1. Read current Next.js Route Handler docs from the installed package.
2. Parse and validate search parameters into typed defaults.
3. Apply search, filters, sorting, and pagination in a deterministic order.
4. Return a stable envelope with items, page, page size, total items, and total pages.
5. Support controlled latency, empty, and error demos without contaminating normal URLs.
6. Use fictional in-repo data only. Do not add persistence, auth, external fetches, or production-backend abstractions.
7. Keep independent work parallel where useful; avoid artificial waterfalls.
8. Run Biome, TypeScript, and a direct request check.
