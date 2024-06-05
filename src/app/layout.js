
import { Inter } from "next/font/google";
import "./globals.css";
import { DAppProvider } from "@usedapp/core";
import { config } from "./homepage/config";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "./Provider";
export const metadata = {
  title: 'DSES App',
  description: 'Wallet',
}
 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${inter.className} flex items-start justify-start`}> {/* so that sidebar is next to the children pages*/}

      <div className="p-8">
      <Providers>
        {children}
      </Providers>
      </div>
      </body>
    </html>
  );
}
