export function ScreenBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden">
      <div className="ambient-canvas absolute inset-0" />
      <div className="bg-primary-light/22 absolute -top-48 -left-40 size-[34rem] rounded-full blur-3xl" />
      <div className="absolute top-[28vh] -right-52 size-[38rem] rounded-full bg-[#d9ecff]/30 blur-3xl dark:bg-[#123d5b]/28" />
      <div className="absolute bottom-[6vh] -left-56 size-[38rem] rounded-full bg-[#fbe9d7]/32 blur-3xl dark:bg-[#4a3026]/24" />
    </div>
  );
}
