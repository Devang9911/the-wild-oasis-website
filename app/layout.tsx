import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Header from "./_components/Header";
import Providers from "./_components/Providers";
import "./_styles/globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: {
    template: "%s - The wild oasis",
    default: "Welcome - The wild oasis",
  },
  description:
    "Luxury hotel located in Manali, Himachal Pradesh, India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${baloo.variable} antialiased min-h-screen bg-gray-800`}
      >
        <Providers>
          <Header />
          <ToastContainer />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
