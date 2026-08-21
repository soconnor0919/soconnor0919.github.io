import { ScreenBackground } from "~/components/screen-background";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a
        href="#main-content"
        className="print-hidden bg-primary-button fixed top-2 left-2 z-[100] -translate-y-20 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScreenBackground />
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}
