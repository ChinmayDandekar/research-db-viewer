import type { Metadata } from "next";
import "@/styles/globals.scss";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Research Finder",
  description: "Browse through a world wide dataset for Research Papers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
