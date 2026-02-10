import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./_styles/globals.css";
import Header from "./_components/Header";

const baloo = Baloo_2({
  // we just have to get name and import we can use chatgpt also to get this and directly use on body baloo.variable
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  // next js gives Metadata type by default
  title: {
    template: "%s - The wild oasis", //%s will replace all pages meta title
    default: "Welcome - The wild oasis", // /route title by default
  },
  description: "Luxary hotel located in Manali , Himachal Pradesh , India", // website description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; //type of children
}>) {
  return (
    <html lang="en">
      <body
        className={`${baloo.variable} antialiased min-h-screen bg-gray-800`}
      >
        <Header />
        <main className=" min-h-screen">{children}</main>
      </body>
    </html>
  );
}
