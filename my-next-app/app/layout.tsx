import Navbar from "@/components/Navbar";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={oswald.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

