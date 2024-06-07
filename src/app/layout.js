import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
import { Providers } from './Provider';
export const metadata = {
  title: 'DSES dApp',
  description: 'Decentralized Application developed for graduation thesis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {' '}
        {/*className={`${inter.className} flex items-start justify-start`, so that sidebar is next to the children pages*/}
        <div className="p-8">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
