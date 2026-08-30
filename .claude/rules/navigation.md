# Navigation and URL state

- Desktop uses a persistent sidebar. Mobile uses an accessible Sheet or dialog-based drawer.
- Navigation groups are Overview, Examples, and Reference. Route labels and paths come from one typed configuration.
- Active routes use `aria-current="page"` and remain visible in both themes.
- Query state covers search, filters, sorting, view, and pagination with stable, readable parameter names.
- Search/filter/sort changes reset pagination when the existing page may be invalid.
- Remove default-valued query parameters when practical to keep URLs concise.
- Browser back, forward, refresh, and copied URLs must restore the same list state.
- Do not use URL state for temporary drawer visibility or unapplied filter drafts.
