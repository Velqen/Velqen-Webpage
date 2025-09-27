import { IBM_Plex_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/Provider";
import ClientLayout from "./ClientLayout";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
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
    icon: "/Velqen_no_bg_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.variable} ${merriweather.variable} antialiased`}
      >
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
