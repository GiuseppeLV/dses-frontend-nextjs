'use client'
import Image from "next/image";
import Head from 'next/head'
import Link from 'next/link'
import { useEthers, DAppProvider } from "@usedapp/core";

import { config } from "./homepage/config";
import Wallet from "./homepage/Wallet";

// Definisci la tua componente per la pagina principale
export default function Home() {
  const{active,library}=useEthers()

  return (
    <div>
      <main>
        <div className="flex flex-row">
        <Wallet className="p-8"/>
        </div>     
      </main>

      
    </div>
  )
}

  