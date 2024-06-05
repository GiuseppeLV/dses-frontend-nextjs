
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLogs } from "@usedapp/core";
import { Contracts } from "../tools/InitContracts";
import Link from "next/link";
import { useEthers } from "@usedapp/core";
import { ReadFunction } from "../tools/CallFunction";
export default function StateNotification(){
    const {account}=useEthers()
    const trades=ReadFunction(Contracts().tradeTokenContract, 'returnTrades', account)
    console.log("TRADES:", trades)

    return(
   
    <div className="flex items-center justify-end">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative" variant="outline" size="icon">
          <BellIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {trades?.map((item, key) => <Link href={`/homepage/notifications/trade/${key}/?id=${item[3].toString()}`}>
           <DropdownMenuItem key={key} className="py-2 px-3 cursor-pointer hover:bg-neutral-50 transition flex items-start gap-2">
          <div className={`h-3 w-3 rounded-full my-1 `}></div>
          <div>
          <p className="text-[14px] font-bold bg-green-600">Trade offer</p>
            <p>PTAmount:{item[2].toString()}</p>
            <p className="text-xs text-neutral-500">From:{item[0]}</p>
          </div>
        </DropdownMenuItem></Link>)}
      </DropdownMenuContent>
    </DropdownMenu>

    </div>);
}
