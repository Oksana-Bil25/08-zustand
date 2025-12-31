import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Providers } from "./providers";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "NoteHub - Твій простір для нотаток",
  description:
    "Зберігайте свої ідеї та плануйте завдання в зручному застосунку NoteHub.",
  openGraph: {
    title: "NoteHub - Твій простір для нотаток",
    description:
      "Зберігайте свої ідеї та плануйте завдання в зручному застосунку NoteHub.",
    url: "https://08-zustand-seven.vercel.app",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body
        className={roboto.className}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <Providers>
          <Header />
          <main style={{ flex: "1 0 auto" }}>{children}</main>

          {modal}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
