import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { SearchContextProvider } from "@/context/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hotel App",
  description: "Hotel Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <SearchContextProvider>
          <body className={inter.className}>{children}</body>
        </SearchContextProvider>
      </AuthContextProvider>
    </html>
  );
}
