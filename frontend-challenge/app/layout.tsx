import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BYOB — Courts",
  description: "Mobile-first tennis courts review app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
