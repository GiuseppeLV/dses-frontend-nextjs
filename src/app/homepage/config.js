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
  networks: [Hardhat, Sepolia],
  readOnlyChainId: Sepolia.chainId,
  readOnlyChainId: Hardhat.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]:
      'https://eth-sepolia.g.alchemy.com/v2/B3ofMGNf_U5Ypy_I65thme9G1zOs7wsn',
    //"https://sepolia.infura.io/v3/4cca36d44de2425a97578b21d5cd0681",
    [Hardhat.chainId]: LOCALHOST_URL,
  },
  notifications: {
    expirationPeriod: 10000, //millisecondi
    checkInterval: 1000, //quanto tempo aspettare prima di controllare che avvenga l'expiration della notifica
  },
};
