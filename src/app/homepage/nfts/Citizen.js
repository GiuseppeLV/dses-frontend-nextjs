import { useEthers } from "@usedapp/core";
import { ReadFunction } from "../tools/CallFunction";
import { Contracts } from "../tools/InitContracts";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { useState } from "react";

import { useToast } from "@/components/ui/use-toast";
export default function Citizen(){
    const {account}=useEthers()
    const[stateCopied, setCopied]=useState(false)
    let getCitizenNfts=ReadFunction(Contracts().pollutionNftContract,'tokensOfOwner',account)

    let {toast}=useToast()
/*
    async function permissionsCheck() {
        const read = await navigator.permissions.query({
            name: 'clipboard-read',
        });
        const write = await navigator.permissions.query({
            name: 'clipboard-write',
        });
        return write.state === 'granted' && read.state !== 'denied';
    }
*/
    async function copyToClipboard(text) {
    toast({
        title: "NFT copied successfully",
        })
    await navigator.clipboard.writeText(text);
 
}
/*
async function init() {
    try {
        const hasPermissions = await permissionsCheck();

        if (hasPermissions && document.hasFocus()) {
            copyToClipboard('Hello world');
        }
    } catch (err) {
        console.error(err);
    }
}

init()
      */

    function showNft(nfts){
        if(getCitizenNfts){
          console.log("getcitizennfts:",getCitizenNfts)
        return (
          <div>
            <span className=" text-gray-800  font-bold text-[20px]">Nfts Owned</span>
              {nfts.map((nft,key) => (  
        <div className="flex flex-row">
            <span className=" text-gray-800  font-bold text-[20px]">•</span>
                <HoverCard>
                    <HoverCardTrigger>
                        <Button variant="secondary" onClick={()=>copyToClipboard(nft)}>{nft}</Button>
                    </HoverCardTrigger>
                  <HoverCardContent>Click to copy to the clipboard</HoverCardContent>
                </HoverCard>
        </div>
              ))}
          </div>
        );
      }
      return "No NFTS owned"
    }
  
      
    return(
        <p>{showNft(getCitizenNfts)}</p>    
    )

}