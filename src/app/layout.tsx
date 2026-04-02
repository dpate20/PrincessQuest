import type { Metadata } from "next";
import { Crimson_Text, Inter } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "English Quest",
  description:
    "A medieval-themed adventure to master English. Build your vocabulary, spelling, and reading comprehension through challenges across five kingdoms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${crimsonText.variable} ${inter.variable} h-full`}>
      <body className="min-h-dvh flex flex-col font-[var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
