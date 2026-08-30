# Accessibility

- Use semantic landmarks, headings, lists, forms, fieldsets, labels, buttons, and links before ARIA.
- One descriptive `h1` per page. Preserve logical heading order.
- All functionality works with keyboard and has a visible `:focus-visible` treatment.
- Icon-only controls require accessible names. Decorative icons are hidden from assistive technology.
- Active navigation uses `aria-current="page"`.
- Filters have explicit names, applied state, reset behavior, and understandable result updates.
- Selection exposes selected count, select-all state, and clear bulk-action labels.
- Loading, empty, and error states are announced appropriately without noisy repeated live regions.
- Status never relies on color alone. Meet WCAG AA contrast in light and dark themes.
- Mobile drawers restore focus, trap focus when modal, close with Escape, and prevent background interaction.
- Respect reduced motion and maintain a minimum 44px touch target where practical.
