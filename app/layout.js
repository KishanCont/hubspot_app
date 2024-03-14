import { TableContextProvider } from "@/providers/TableContext";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HubSpot App",
  description: "Platform to create logical table for your product",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TableContextProvider>{children}</TableContextProvider>
      </body>
    </html>
  );
}
