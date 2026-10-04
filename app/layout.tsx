import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@anuj20/void-ui/styles";
import "./globals.css";

// Reading text only; Kode Mono (loaded by void-ui) stays the display and UI face.
const plexMono = IBM_Plex_Mono({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Anuj Punekar — Portfolio",
  description:
    "Full-stack developer portfolio — work, projects, and a bit of Tetris.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={plexMono.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
