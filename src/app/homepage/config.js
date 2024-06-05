'use client'


import React from "react";
import ReactDOM from "react-dom";
import Admin from "./roles/Admin";
import State from "./roles/State"
import { Contracts } from "./tools/InitContracts";

import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Sepolia,
  Hardhat,
  useCall
} from "@usedapp/core";
import Wallet from "./Wallet";
const SEPOLIA_URL = process.env.SEPOLIA_RPC_URL;
const LOCALHOST_URL = process.env.LOCALHOST_RPC_URL;
const adminAddressLocal="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

export const config = {
    networks:[Hardhat],
    //readOnlyChainId: Sepolia.chainId,
    readOnlyChainId:Hardhat.chainId,
    readOnlyUrls: {
      //[Sepolia.chainId]: "https://eth-sepolia.g.alchemy.com/v2/B3ofMGNf_U5Ypy_I65thme9G1zOs7wsn",
       //"https://sepolia.infura.io/v3/4cca36d44de2425a97578b21d5cd0681",
      [Hardhat.chainId]: LOCALHOST_URL,
    },
    notifications: {
      expirationPeriod: 10000, //millisecondi
      checkInterval: 1000, //quanto tempo aspettare prima di controllare che avvenga l'expiration della notifica
    },
  };

/*
  const stateByAddress = useCall({
    contract: Contracts().dsesCenterContract,
    method: 'checkExistingState',
    args: [account?account:undefined]
  });
*/



