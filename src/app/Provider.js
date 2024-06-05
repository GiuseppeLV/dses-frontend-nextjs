'use client'
import { DAppProvider } from "@usedapp/core";
import { config } from "./homepage/config";


export function Providers({ children }) {
    return (
      <DAppProvider config={config}>
        {children}
      </DAppProvider>
    )
  }