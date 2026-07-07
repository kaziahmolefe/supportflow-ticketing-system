import "./globals.css";

import { SearchProvider } from "@/context/SearchContext";
import Provider from "@/components/providers/ThemeProvider";

import {
  Inter,
  Space_Grotesk,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  title: "GSS Support Ticketing",
  description: "Smart Support Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`
          ${inter.variable}
          ${display.variable}
        `}
      >
        <Provider>

          <SearchProvider>

            {children}

          </SearchProvider>

        </Provider>
      </body>
    </html>
  );
}