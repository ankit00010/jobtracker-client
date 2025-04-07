import type { Metadata } from "next";
import "./globals.css";
import AdminProvider from "@/context/admin_context";
import Header from "@/component/Header";

export const metadata: Metadata = {
  title: "AXCEL",
  description: "Admin CMS",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>
          <Header />
          <div className="main-content">{children}</div>
        </AdminProvider>
      </body>
    </html>
  );
}
