'use client'

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Toaster position="bottom-center"/>
        {children}
    </>
  );
}
