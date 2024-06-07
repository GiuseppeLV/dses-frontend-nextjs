'use client';
import Sidebar from '../../components/Sidebar';
import Header from '@/components/Header';
import { DAppProvider, useEthers } from '@usedapp/core';
import { config } from './config';
import { Toaster } from '@/components/ui/toaster';

export default function PagesLayout({ children }) {
  const { account } = useEthers();
  return (
    <div>
      {account ? (
        <div>
          <Sidebar />
          <main className="grid w-full h-full  pl-[300px]">
            <Header />
            <div className="p-8">
              {children}
              <Toaster />
            </div>
          </main>
        </div>
      ) : null}
    </div>
  );
}
