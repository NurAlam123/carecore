import type { Metadata } from "next";
import { railway } from "@/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "CareCore",
  description: "A modern healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${railway.variable} antialiased font font-railway`}>
        {children}
      </body>
    </html>
  );
}
