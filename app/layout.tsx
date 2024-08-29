import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";

export const metadata: Metadata = {
  title: "AI-Image-Generator",
  description: "AI generated images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <PromptInput />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
