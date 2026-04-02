import type { Metadata } from "next";
import { Cinzel, Nunito } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Princess English Quest",
  description:
    "Join Princess Sara on a fantasy adventure to master vocabulary, spelling, and reading comprehension across five enchanted kingdoms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${nunito.variable} h-full`}>
      <body className="min-h-dvh flex flex-col font-[var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
