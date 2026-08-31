# Tailwind readability

- Keep short, local, one-purpose Tailwind utilities inline.
- Use `cva` for reusable variants, state matrices, sizes, and positional variants.
- Extract meaningful named style recipes only when they describe a real reusable visual concept.
- Extract a subcomponent when it improves both structural and styling readability.
- Use `cn()` for conditional composition.
- Keep static Tailwind class names as complete literals so Tailwind CSS 4 can detect them. Never build class names through string interpolation.
- Move repeated design decisions into Tailwind CSS 4 theme tokens when they are genuinely part of the design system.
- Do not move ordinary component styling into `globals.css`. Avoid broad `@apply` abstractions and generic classes such as `.card`, `.row`, or `.container`.
- Do not create large style-object files that merely relocate every class string.
- Avoid unnecessary abstraction: a repeated exact string is worth naming, but do not invent a variant matrix, cva config, or subcomponent for styling that only looks similar. When in doubt, leave a dense-but-correct primitive string alone and say why in review notes rather than force an abstraction that does not fit.
- Avoid excessively long styling expressions: when a single className string mixes several unrelated concerns (layout, focus, disabled/invalid state, dark mode, icon sizing), split it into named local constants grouped by concern and compose them with `cn()`. This is a plain refactor, not a behavior change — verify the resulting class set is unchanged before and after.
- Preserve owned shadcn/Base UI primitive behavior and accessibility exactly; a readability pass must not change rendered output, keyboard behavior, or ARIA semantics.
