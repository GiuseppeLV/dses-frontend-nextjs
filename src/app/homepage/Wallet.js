import React from 'react';
import { Sepolia, useEthers, useTokenBalance, useLogs } from '@usedapp/core';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
export default function Wallet() {
  const { activateBrowserWallet, account } = useEthers();
  const router = useRouter();
  const pathname = usePathname();
  function redirectToHomepage() {
    if (pathname == '/') {
      router.push('/homepage');
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {account ? (
          //redirect('/homepage')
          redirectToHomepage()
        ) : (
          <div>
            <h1 className="mb-8 text-6xl font-extrabold text-green-800">
              Decentralized System for Environmental Sustainability
            </h1>
            <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800">
              Please connect wallet. <br />{' '}
            </h4>
            <Link href="/homepage">
              <Button
                className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                onClick={() => activateBrowserWallet()}
              >
                Connect Wallet
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
