import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { FolderProvider } from "@/lib/folder-context";
import { LinkProvider } from "@/lib/link-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  title: {
    default: '한입 링크',
    template: '%s | 한입 링크',
  },
  description: '나만의 링크 모음',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '한입 링크',
    description: '나만의 링크 모음',
    images: [{ url: '/thumbnail.png', width: 2400, height: 1260, alt: '한입 링크' }],
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <FolderProvider>
          <LinkProvider>{children}</LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
