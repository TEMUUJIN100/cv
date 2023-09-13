import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BreadCrumb } from "@/components/BreadCrumb";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meborny",
  description: "Meborny app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-screen flex flex-col ">
          <Navbar />
          <div className="flex flex-col mt-1">
            <BreadCrumb />
            <div className="h-screen flex flex-row  justify-center">
              <div className="flex flex-col item-center justify-center w-4/6">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
