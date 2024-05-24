import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import type { Metadata } from 'next'

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  const session = await getServerSession();

  const metadata: Metadata = {
    title: '...',
    description: '...',
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
             { children }
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
