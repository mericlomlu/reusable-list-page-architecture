# System states

- Every example supports intentional loading, empty, filtered-empty, and error states.
- Loading preserves layout and communicates progress without blocking unrelated navigation.
- Empty states distinguish no data from no matching results.
- Errors use plain language, avoid technical leakage, and provide a focused retry action where recovery is possible.
- Selection and bulk actions remain stable through allowed list updates and clear predictably after destructive mock actions.
- Disabled controls explain their state through context, not tooltip-only copy.
- Status is communicated with text or icon plus text, never color alone.
- Mock endpoints may expose explicit demo-state parameters, but normal URLs should remain clean.
