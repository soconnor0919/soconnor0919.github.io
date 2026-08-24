export function ScreenBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden">
      <div className="ambient-canvas absolute inset-0" />
    </div>
  );
}
