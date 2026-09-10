import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stacks — Paper Library",
  description: "Browse, filter, and track research papers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
