import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProductPage from "@/components/main/MarketPlace";


export const metadata: Metadata = {
  title: "E Commerce",
  description: "M K Kagra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
