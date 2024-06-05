'use client'

import React from "react";
import { Sepolia, useEthers, useTokenBalance, useLogs,useCall } from "@usedapp/core";
import Admin from "./roles/Admin";
import { Contracts } from "./tools/InitContracts";
import State from "./roles/State";
import { ReadFunction } from "./tools/CallFunction";
import City from "./roles/City";
import Citizen from "./roles/Citizen"
import { DAppProvider } from "@usedapp/core";
import { config } from "./config";
import PagesLayout from "./layout";
import Wallet from "./Wallet";
export default function RolePage() {
  const { activateBrowserWallet, deactivate,active,account } = useEthers();
  //const tokenBalanceLocal = useTokenBalance(tokenAddress, account, { chainId: Localhost.chainId })
  //const tokenBalanceSepolia = useTokenBalance(tokenAddress, account, { chainId: Sepolia.chainId })
  const checkExistingAdminLocal="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  let isAdmin=false;
  console.log("IsActivepahget:", active)
  console.log("Account dentro page:", account)
  console.log("Contratto dsesceter", Contracts().dsesCenterContract)


  return (
    <div>   
    {account?(<div>  
      {ReadFunction(Contracts().dsesCenterContract,'checkExistingAdmin', account)?<Admin/>:null} 
      {ReadFunction(Contracts().dsesCenterContract,'checkExistingState', account)?<State/>:null} 
      {ReadFunction(Contracts().dsesCenterContract,'checkExistingCity', account)?<City/>:null} 
      {ReadFunction(Contracts().cityCitizenContract,'checkExistingCitizen', account)?<Citizen/>:null} 
      </div>):null}
    </div>


  
  )

 
}
