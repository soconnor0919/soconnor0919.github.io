export function SiteFooter() {
  return (
    <footer className="print-hidden border-t border-border-soft bg-surface/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-base font-semibold text-foreground">Medscribe</p>
          <p className="mt-1 max-w-md leading-relaxed">
            Be known when care gets complicated.
          </p>
        </div>
        <div>
          <p>
            Built by{" "}
            <a
              href="https://soconnor.dev"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Sean O&apos;Connor
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
