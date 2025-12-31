import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Providers } from "./providers";
import "./globals.css";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
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
