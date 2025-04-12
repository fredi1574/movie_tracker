// import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MovieTracker",
  description: "Track your favorite movies and discover new ones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem> */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
