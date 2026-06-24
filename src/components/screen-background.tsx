export function ScreenBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-canvas"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15,23,42,0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[260px] bg-gradient-to-b from-primary-light/24 to-transparent" />
    </div>
  );
}
