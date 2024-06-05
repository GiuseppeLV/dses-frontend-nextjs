import React from "react";
import { Sepolia, useEthers, useTokenBalance, useLogs } from "@usedapp/core";
import { ReadFunction } from "./tools/CallFunction";
import { Contracts } from "./tools/InitContracts";
import Admin from "./roles/Admin";
import RolePage from "./page";
import Link from "next/link";
import PagesLayout from "./layout";
import { redirect } from "next/navigation";

export default function Wallet() {
  const { activateBrowserWallet, account, deactivate,active } = useEthers();
  let tokenBalance=account?(ReadFunction(Contracts().pollutionTokenContract, 'getBalanceOf', account)?.toString()):null
  tokenBalance=tokenBalance/10**18

        
  //const tokenBalanceLocal = useTokenBalance(tokenAddress, account, { chainId: Localhost.chainId })
  //const tokenBalanceSepolia = useTokenBalance(tokenAddress, account, { chainId: Sepolia.chainId })
  const adminAddressLocal="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  let isAdmin=false;
  console.log("IsActivewallet:", active)
  console.log("Account dentro wallet:", account)
  return (
    <div>
      {account ? (
        console.log("homepe"),
        redirect('/homepage')
        

      ) : (
        <p>
          Please connect wallet. <br />{" "}
<Link href="/homepage">
          <button onClick={() => activateBrowserWallet() }>
            Connect Wallet
          </button>
          </Link>
        </p>
    
      )
      }      
      
     
      </div>
  )
}
