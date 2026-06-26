import { ScreenBackground } from "~/components/screen-background";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ScreenBackground />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
