'use client';
import { useEthers } from "@usedapp/core";
import { ReadFunction } from "@/app/homepage/tools/CallFunction";
import { Contracts } from "@/app/homepage/tools/InitContracts";
import Link from "next/link";
export default function UserItem() {
  const {deactivate, account}=useEthers()
  console.log("account:", account)
  let tokenBalance=account?(ReadFunction(Contracts().pollutionTokenContract, 'balanceOf', account)?.toString()):null
  let accountKey=account.slice(0,20);
  return <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
    <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-500 text-white font-[700] flex items-center justify-center">
      <p>GD</p>
    </div>
    <div className="grow">
      <p className="text-[16px] font-bold">Token Balance: {tokenBalance/10**18}</p>
      <p className="text-[12px] text-neutral-500">{accountKey}...</p>
      <Link href="/"><button onClick={() => deactivate()} className="text-[14px] text-ellipsis underline hover:text-blue-500 ">Disconnect</button></Link>
    </div>
  </div>;
}