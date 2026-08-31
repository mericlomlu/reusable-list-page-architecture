interface CodeFigureProps {
  caption: string;
  code: string;
}

export function CodeFigure({ caption, code }: CodeFigureProps) {
  return (
    <figure className="m-0 min-w-0">
      <figcaption className="mb-2 font-mono text-label font-bold tracking-wider text-muted-foreground uppercase">
        {caption}
      </figcaption>
      <pre
        // biome-ignore lint/a11y/noNoninteractiveTabindex: makes this horizontally-scrollable code sample keyboard-focusable so its overflow content is reachable without a mouse (WCAG SC 2.1.1).
        tabIndex={0}
        className="overflow-x-auto rounded-lg border border-border bg-card px-4 py-3.5 text-caption leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </figure>
  );
}
