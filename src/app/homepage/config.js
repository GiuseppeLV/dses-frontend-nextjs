import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Sepolia,
  Hardhat,
  useCall,
} from '@usedapp/core';
console.log('Sepoliarpc:', Sepolia.rpcUrl);
export const config = {
  networks: [Sepolia, Hardhat], //ADD Hardhat FOR LOCAL TEST
  readOnlyChainId: Sepolia.chainId, //REMOVE COMMENT FOR LOCAL TEST
  readOnlyChainId: Hardhat.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]: Sepolia.rpcUrl,

    [Hardhat.chainId]: Hardhat.rpcUrl, //REMOVE COMMENT FOR LOCAL TEST
  },
  notifications: {
    expirationPeriod: 10000, //millisecondi
    checkInterval: 1000, //quanto tempo aspettare prima di controllare che avvenga l'expiration della notifica
  },
};
