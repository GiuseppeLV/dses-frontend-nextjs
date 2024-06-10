'use client';

import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Sepolia,
  Hardhat,
  useCall,
} from '@usedapp/core';

const SEPOLIA_URL = process.env.SEPOLIA_RPC_URL;
const LOCALHOST_URL = process.env.LOCALHOST_RPC_URL;

export const config = {
  networks: [Sepolia],
  readOnlyChainId: Sepolia.chainId,
  //readOnlyChainId: Hardhat.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]: SEPOLIA_URL,

    //[Hardhat.chainId]: LOCALHOST_URL,
  },
  notifications: {
    expirationPeriod: 10000, //millisecondi
    checkInterval: 1000, //quanto tempo aspettare prima di controllare che avvenga l'expiration della notifica
  },
};
