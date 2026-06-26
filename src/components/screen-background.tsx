export function ScreenBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden">
      <div
        className="absolute inset-0 bg-canvas"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[260px] bg-gradient-to-b from-primary-light/24 to-transparent" />
    </div>
  );
}
