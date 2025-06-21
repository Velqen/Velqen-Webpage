import { IBM_Plex_Sans, Merriweather } from "next/font/google"; // import Merriweather
import "./globals.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import AuthProvider from "./auth/Provider";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "700"], // <-- Add this line
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Velqen",
  description:
    "Free AI tool for invoice extraction, transaction classification, and record reconciliation",
  icons: {
    icon: "/Velqen_no_bg_logo.png", // 🔁 This is your custom favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${ibmPlexSans.variable} ${merriweather.variable} antialiased`}
        >
          <main className="font-(family-name:--font-ibm-plex-sans)">
            <NavBar />
            {children}
            <Footer />
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}
