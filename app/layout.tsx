import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@anuj20/void-ui/styles";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anuj Punekar — Portfolio",
  description:
    "Full-stack developer portfolio — work, projects, and a bit of Tetris.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
