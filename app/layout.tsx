import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ClientProvider from "@/components/ClientProvider";

export const metadata: Metadata = {
  title: "AI Art Gallery",
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
        <ClientProvider>
          <Header />

          <PromptInput />

          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
