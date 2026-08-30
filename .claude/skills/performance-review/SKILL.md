---
name: performance-review
description: Reviews client JavaScript, rendering boundaries, list performance, assets, fonts, and layout stability. Use after completing shared list behavior or before release.
---

# Performance review

Inspect without editing:

- Server/Client boundaries and hydration surface;
- data-fetch waterfalls and unnecessary serialization;
- unnecessary effects, subscriptions, memoization, and global listeners;
- long-list rendering and whether pagination already bounds the work;
- direct imports, conditional heavy UI, and bundle candidates;
- font loading, icons, images, favicon, and OG assets;
- loading-state layout shift and responsive stability.

Separate confirmed problems from speculative optimizations. Include evidence and the smallest fix.
