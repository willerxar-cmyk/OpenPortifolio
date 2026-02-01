import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import { I18nProvider } from "@/contexts/I18nContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Portfolio | Design, Code & 3D",
  description: "A showcase of creative work spanning design, development, 3D modeling, and digital arts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased`}>
        <I18nProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}
