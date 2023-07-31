import { ExpandContextProvider } from "@/components/contexts/expandNavBarContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageContextProvider } from "@/components/contexts/langueContext";
import TraductionProvider from "@/app/utils/Traduction" 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "test app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ExpandContextProvider>
          <TraductionProvider>

          <LanguageContextProvider>{children}</LanguageContextProvider>
          </TraductionProvider>
        </ExpandContextProvider>
      </body>
    </html>
  );
}
